import { Container } from '@/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
        }}>
        <Text>首页</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
});

export default Index;
