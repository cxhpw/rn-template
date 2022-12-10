import {useNetwork} from '@/hooks';
import type {NetInfoState} from '@react-native-community/netinfo';
import {createContext, PropsWithChildren, type ReactNode} from 'react';

const EMPTY = Symbol('EMPTY');

type ConsumerProps<Value> = {
  children: (value: Value) => ReactNode;
};

export function createNetworkService() {
  const Context = createContext<any | typeof EMPTY>(EMPTY);
  const ShareModelProvider = ({children}: PropsWithChildren) => {
    const [value] = useNetwork();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  const ShareModelConsumer = (props: ConsumerProps<NetInfoState>) => {
    return (
      <Context.Consumer>
        {value => {
          if (value === EMPTY) {
            throw new Error(
              'Component must be wrapped with <Container.Provider>',
            );
          }
          return props.children(value);
        }}
      </Context.Consumer>
    );
  };
  return {
    Provider: ShareModelProvider,
    Consumer: ShareModelConsumer,
  };
}
