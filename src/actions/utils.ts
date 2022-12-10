export const SET_NETWORK = 'SET_NETWORK';

export function setNetwork(isConnected: boolean) {
  return {
    type: SET_NETWORK,
    payload: isConnected,
  };
}
