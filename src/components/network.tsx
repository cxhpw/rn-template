import {useNetwork} from '@/hooks';
import type {FC, PropsWithChildren} from 'react';

const NetworkProvider: FC<PropsWithChildren> = ({children}) => {
  useNetwork();
  return <>{children}</>;
};

export default NetworkProvider;
