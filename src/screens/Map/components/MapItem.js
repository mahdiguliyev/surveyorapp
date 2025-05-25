import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useState, useRef} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AtmMapIcon from '@assets/svg/AtmMapIcon';
import BankMapIcon from '@assets/svg/BankMapIcon';
import SearchIcon from '@assets/svg/SearchIcon';
import styles from '../style.map';
import MapDetail from './MapDetail';

const Item = ({branch, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.map_item_card}
      onPress={onPress}>
      <View style={styles.map_item_card_icon}>
        {branch.type === 1 ? <BankMapIcon /> : <AtmMapIcon />}
      </View>
      <View style={styles.map_item_card_text_container}>
        <Text style={styles.map_item_card_text_title}>{branch.title}</Text>
        <Text style={styles.map_item_card_text_content}>{branch.content}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MapItem = ({
  filteredDataSource,
  handleBranchPress,
  setFilteredDataSource,
  activeDetail,
  selectedBranch,
  userLocation,
}) => {
  const [search, setSearch] = useState('');
  const [originalData] = useState(filteredDataSource);
  const timeoutRef = useRef(null);
  const borderColor = useSharedValue('#D7D7D7');
  const listOpacity = useSharedValue(1);

  const handleSearch = text => {
    setSearch(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      listOpacity.value = 0;
      if (!text.trim()) {
        setFilteredDataSource(originalData);
      } else {
        const upperText = text.toUpperCase();
        const newData = originalData.filter(
          item =>
            item.title?.toUpperCase().includes(upperText) ||
            item.content?.toUpperCase().includes(upperText) ||
            item.address?.toUpperCase().includes(upperText),
        );
        setFilteredDataSource(newData);
      }
      listOpacity.value = withTiming(1, {duration: 100});
    }, 300);
  };
  const handleFocus = () => {
    borderColor.value = withTiming('#0B5AAE', {duration: 200});
  };

  const handleBlur = () => {
    borderColor.value = withTiming('#D7D7D7', {duration: 200});
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
      borderWidth: 1,
    };
  });
  const animatedListStyle = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
    };
  });

  return (
    <View>
      {activeDetail ? (
        <MapDetail detail={selectedBranch} userLocation={userLocation} />
      ) : (
        <>
          <Animated.View style={[styles.map_searchbar, animatedContainerStyle]}>
            <TextInput
              placeholder="Axtarış"
              value={search}
              onChangeText={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor="#A3A3A3"
              style={styles.map_search_input}
            />
            <SearchIcon />
          </Animated.View>
          <Animated.FlatList
            style={[animatedListStyle]}
            data={filteredDataSource}
            renderItem={({item}) => (
              <Item branch={item} onPress={() => handleBranchPress(item)} />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatLisPadding}
          />
        </>
      )}
    </View>
  );
};

export default MapItem;
