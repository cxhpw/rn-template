import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';

type Props = {
  value: string;
  options: Array<string>;
  onChange: Function;
};

const MPicker: React.FC<Props> = ({value, options, onChange}) => {
  return (
    <View>
      <View>
        <Text>{value}</Text>
      </View>
      <Picker
        prompt="请选择"
        selectedValue={value}
        onValueChange={(itemValue) => {
          onChange(itemValue);
        }}>
        {options.map((value, i) => {
          return <Picker.Item key={i} label={value} value={value} />;
        })}
      </Picker>
    </View>
  );
};

export default MPicker;
// export default function Picker>(props) {
//   const {value, onChange, options} = props;

// }
