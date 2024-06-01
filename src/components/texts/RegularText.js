import React from 'react';
import { Text as RNText } from 'react-native';

const RegularText = ({ style, ...props }) => {
  return <RNText style={[{ fontFamily: 'Poppins-Regular' }, style]} {...props} />;
};

export default RegularText;
