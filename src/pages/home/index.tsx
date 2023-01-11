import { Container } from '@/components';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container>
      <View>
        <Text>首页</Text>
      </View>
    </Container>
  );
};

export default Index;
