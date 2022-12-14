import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { View, Text, Button, Image } from 'react-native';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@/images/logo.jpg')}
    />
  );
}

function HomeScreen({
  route,
  navigation,
}: NativeStackScreenProps<{ Detail: undefined }>) {
  return (
    <View
      style={{
        backgroundColor: '#f3f3f3',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ color: 'red' }}>{route.name} Screen</Text>
      <Button
        title="跳转"
        onPress={() => {
          navigation.navigate('Detail');
        }}
      />
    </View>
  );
}

function DetailsScreen({
  route,
  navigation,
}: NativeStackScreenProps<{
  Detail: {
    id: number;
  };
}>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{route.name} Screen11ß</Text>
      <Button
        title="跳转"
        onPress={() => {
          navigation.push('Detail', {
            id: 220,
          });
        }}
      />
    </View>
  );
}

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        animationDuration: 400,
        animation: 'slide_from_right',
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        statusBarColor: '#f4511e',
        statusBarStyle: 'light',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={() => {
          return {
            headerRight: () => {
              return <Button title="Info" />;
            },
          };
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailsScreen}
        options={{
          headerTitle: () => <LogoTitle />,
        }}
      />
    </Stack.Navigator>
  );
};
