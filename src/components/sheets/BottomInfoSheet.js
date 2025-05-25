import React, {forwardRef} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import RevealedSheet from './RevealedSheet';

const BottomInfoSheetWrapper = gestureHandlerRootHOC(RevealedSheet);

const BottomInfoSheet = forwardRef(
  ({children, maxTranslateY, halfTranslateY ,translateY}, ref) => {
    return (
      <BottomInfoSheetWrapper
        ref={ref}
        maxTranslateY={maxTranslateY}
        halfTranslateY={halfTranslateY}
        translateY={translateY}>
        {children}
      </BottomInfoSheetWrapper>
    );
  },
);

export default BottomInfoSheet;
