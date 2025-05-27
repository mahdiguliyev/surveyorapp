import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import ModalSheet from '@components/sheets/ModalSheet';
import AppText from '@components/AppText';
import PersonChooseItem from '../screens/Home/components/PersonChooseItem';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const PersonChoose = ({
  data,
  modalVisible,
  onPress,
  setSelectedItem,
  //setCardNumber,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const SIZE_MODAL_SHOW = Math.min(contentHeight + 90, SCREEN_HEIGHT * 0.9);

  const handleSelect = item => {
    setSelectedId(item.id);
    setSelectedItem(item);
    onPress();
  };

  return (
    <ModalSheet
      modalVisible={modalVisible}
      onShow={onPress}
      sizeModel={SIZE_MODAL_SHOW}>
      <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
        <AppText variant="medium" fontSize={20} color="black" mb={10}>
          Seçim edin
        </AppText>
        <View>
          {data.map((item, index) => (
            <PersonChooseItem
              key={index}
              item={item}
              onSelect={handleSelect}
              selectedId={selectedId}
            />
          ))}
        </View>
      </View>
    </ModalSheet>
  );
};

export default PersonChoose;
