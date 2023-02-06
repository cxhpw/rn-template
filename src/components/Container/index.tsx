import type { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import { type AppTheme } from '@/theme';

const Container: React.FC<
  PropsWithChildren<{ hasHeader?: boolean; backgroundColor?: string }>
> = ({ hasHeader = true, children, backgroundColor }) => {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        backgroundColor ||
        (theme.theme === 'light' ? theme.colors.white : theme.colors.black),
      position: 'relative',
    },
  });
  return (
    <SafeAreaView
      style={styles.container}
      edges={
        hasHeader ? ['left', 'right', 'bottom'] : ['top', 'left', 'right']
      }>
      <StatusBar
        barStyle={theme.theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />
      {children}
    </SafeAreaView>
  );
};

export default Container;
