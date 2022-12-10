/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Appearance,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import store from '@/store';

import {Provider} from 'react-redux';
import {useSafeState, useMemoizedFn} from 'ahooks';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {Test} from './components';
import {useNetwork} from './hooks';

const App = () => {
  // 监听网络情况
  useNetwork(store);
  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());
  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useEffect(() => {
    const listener = Appearance.addChangeListener(themeChange);
    return () => listener.remove();
  });
  const isDarkMode = theme === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Test />
          <Header />
          <View
            style={{
              backgroundColor: 'red',
              height: 100,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 40,
              }}>
              123
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
