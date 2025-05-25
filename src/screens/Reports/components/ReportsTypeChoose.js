import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import ModalSheet from '@components/sheets/ModalSheet';
import AppText from '@components/AppText';
import ReportItem from './ReportItem';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const ReportsTypeChoose = ({
  data,
  modalVisible,
  onPress,
  selectedType,
  onSelectType,
}) => {
  const [selectedReportType, setReportType] = useState(selectedType);
  const [contentHeight, setContentHeight] = useState(0);
  const SIZE_MODAL_SHOW = Math.min(contentHeight + 90, SCREEN_HEIGHT * 0.9);
  useEffect(() => {
    setReportType(selectedType);
  }, [selectedType]);

  const handleSelect = item => {
    setReportType(item.type);
    onSelectType(item);
    onPress();
  };
  return (
    <ModalSheet
      modalVisible={modalVisible}
      onShow={onPress}
      sizeModel={SIZE_MODAL_SHOW}>
      <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
        <View style={{alignItems: 'flex-start', marginBottom: 20}}>
          <AppText variant="medium" fontSize={20} color="black" mb={10}>
            Hesabat tipini seçin
          </AppText>
        </View>
        <View>
          {data.map((item, index) => (
            <ReportItem
              key={index}
              item={item}
              onSelect={handleSelect}
              selectedItem={selectedReportType}
            />
          ))}
        </View>
      </View>
    </ModalSheet>
  );
};

export default ReportsTypeChoose;
