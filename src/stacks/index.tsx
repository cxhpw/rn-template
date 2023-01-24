import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabScreen from './tabStack';

const Stack = createNativeStackNavigator();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getHeaderTitle(route: any) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(1, routeName);
  switch (routeName) {
    case undefined:
    case 'HomePage':
      return '首页';
    case 'My':
      return '我的';
    default:
      return routeName;
  }
}

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={() => {
        return {
          animation: 'slide_from_right',
          headerTitleAlign: 'center',
          animationDuration: 400,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        };
      }}>
      <Stack.Group
        screenOptions={{
          presentation: 'card',
          headerShown: true,
        }}>
        <Stack.Screen name="Tab" component={TabScreen} />
      </Stack.Group>
      <Stack.Group>
        {/* <Stack.Screen
          name="Detail"
          component={FourScreen}
          options={({ navigation }) => {
            return {
              headerLeft: () => {
                if (navigation.canGoBack()) {
                  return null;
                } else {
                  return (
                    <Button
                      title="首页"
                      onPress={() => {
                        console.log('返回首页');
                        navigation.replace('Tab');
                      }}
                    />
                  );
                }
              },
            };
          }}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};
