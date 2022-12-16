import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { View, Text, Button, Image, Alert } from 'react-native';
import {
  useFocusEffect,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { Container } from '@/components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'Two':
      return 'News Two';
    case 'Three':
      return 'My Three';
    default:
      return routeName;
  }
}
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@/images/logo.jpg')}
    />
  );
}

function OneScreen() {
  return (
    <View>
      <Text>OneScreen</Text>
    </View>
  );
}

function TwoScreen({ route, navigation }: BottomTabScreenProps<any>) {
  return (
    <View>
      <Text>TwoScreen</Text>
      <Button
        title="click"
        onPress={() => {
          navigation.navigate('Detail');
        }}
      />
    </View>
  );
}

function ThreeScreen({
  navigation,
}: NativeStackScreenProps<{ Four: undefined }>) {
  return (
    <Container hasHeader={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#fff' }}>ThreeScreen</Text>
        <Button
          title="跳转"
          onPress={() => {
            navigation.navigate('Four');
          }}
        />
        <Text style={{ color: '#fff' }}>sdasd</Text>
      </View>
    </Container>
  );
}

function FourScreen({ navigation, route }: NativeStackScreenProps<any>) {
  useFocusEffect(() => {
    console.log(12);
    navigation.addListener('beforeRemove', e => {
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>FourScreen</Text>
    </View>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Two" component={TwoScreen} />
      <Tab.Screen name="Three" component={ThreeScreen} />
    </Tab.Navigator>
  );
}

export default () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => {
        console.log(navigation.getState());
        return {
          headerTitle: getHeaderTitle(route),
          animation: 'slide_from_right',
          headerTitleAlign: 'center',
        };
      }}>
      <Stack.Screen name="Home" component={TabScreen} />
      <Stack.Screen
        name="Detail"
        component={FourScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => <Button title="asd" />,
        }}
      />
    </Stack.Navigator>
  );
};
