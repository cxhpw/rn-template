import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@/components';
import Home from '@/screens/home';
import My from '@/screens/my';
import helper from '@/helper';
import { IconNames } from '@/components/Icon';
import { Text } from 'react-native';

const { scale } = helper;
const Tab = createBottomTabNavigator();

const tabItems: {
  name: string;
  component: React.FC;
  label: string;
  icon: IconNames;
}[] = [
  {
    component: Home,
    name: 'Home',
    label: '首页',
    icon: 'didian',
  },
  {
    component: My,
    name: 'My',
    label: '我的',
    icon: 'jinggao',
  },
];

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarStyle: {
          paddingTop: scale(4),
        },
      }}>
      {tabItems.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              title: item.label,
              tabBarLabel({ focused }) {
                return (
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      fontSize: scale(12),
                      color: focused ? 'red' : '#000',
                    }}>
                    {item.label}
                  </Text>
                );
              },
              tabBarIcon({ focused }) {
                return (
                  <Icon
                    name={item.icon}
                    size={scale(20)}
                    color={focused ? 'red' : '#000'}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default TabStack;
