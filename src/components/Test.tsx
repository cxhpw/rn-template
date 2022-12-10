import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

type Props = {
  isOnline: Boolean;
};
const Test: React.FC<Props> = ({isOnline}) => {
  return (
    <View>
      <Text>{isOnline ? '在线' : '离线'}</Text>
    </View>
  );
};

export default connect(({isOnline}: any) => ({isOnline}))(Test);
