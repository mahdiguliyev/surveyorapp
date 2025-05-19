import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useCallback, useRef, useState} from 'react';

import {COLORS} from '@components/styles/colors';
import {HomeThemeProvider} from './context/HomeThemeProvider';
import Table from '../../components/general/ReportList';
import Header from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradientHome from './components/LinearGradientHome';
import NavbarContentSwitcher from './components/NavbarContentSwitcher';
import NavbarButton from './components/NavbarButton';
import {useFocusEffect} from '@react-navigation/native';
import UnusedPhotos from './components/UnusedPhotos';

export default function HomeScreen({navigation}) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [animateHighlight, setAnimateHighlight] = useState(true);
  const highlightRef = useRef(null);

  const handleTabPress = index => {
    setAnimateHighlight(true);
    setActiveTab(index);
  };

  useFocusEffect(
    useCallback(() => {
      setAnimateHighlight(false);
      setActiveTab(0);
    }, []),
  );

  const handleTransferPress = () => {
    //navigation.navigate('ReportDetail');
    alert('ReportDetail screen');
  };

  return (
    <HomeThemeProvider>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={[styles.home_card_section, {paddingTop: insets.top}]}>
            <LinearGradientHome />
            <Header />
            <View>
              <NavbarButton
                activeTab={activeTab}
                onTabPress={handleTabPress}
                highlightRef={highlightRef}
                animateHighlight={animateHighlight}
              />
              <View>
                <NavbarContentSwitcher activeTab={activeTab} />
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <UnusedPhotos />
          </View>
        </View>
      </View>
    </HomeThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  home_card_section: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
