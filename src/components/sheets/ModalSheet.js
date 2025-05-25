import React, {useEffect, useRef} from 'react';
import {Modal, Dimensions} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SIZE_MODAL_SHOW = SCREEN_HEIGHT / 1.5;

const BottomSheetWrapper = gestureHandlerRootHOC(
  ({children, modalVisible, onShow, sizeMode}) => {
    const refBottomSheet = useRef(null);

    useEffect(() => {
      if (!modalVisible) {
        refBottomSheet.current?.scrollTo(0);
      } else {
        refBottomSheet.current?.scrollTo(-sizeMode);
      }
    }, [modalVisible, sizeMode]);

    return (
      <BottomSheet ref={refBottomSheet} onShow={onShow}>
        {children}
      </BottomSheet>
    );
  },
);

const ModalSheet = ({
  children,
  modalVisible,
  onShow,
  sizeModel = SIZE_MODAL_SHOW,
}) => {
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={onShow}
      transparent={true}
      statusBarTranslucent={true}>
      <BottomSheetWrapper
        children={children}
        modalVisible={modalVisible}
        onShow={onShow}
        sizeMode={sizeModel}
      />
    </Modal>
  );
};

export default ModalSheet;
