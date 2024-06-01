import React from 'react';
import { Text as RNText } from 'react-native';

const BoldText = ({ style, ...props }) => {
  return <RNText style={[{ fontFamily: 'Poppins-Bold' }, style]} {...props} />;
};

export default BoldText;