import {SET_NETWORK} from '@/actions/utils';

/**
 * 是否联网
 */
function isOnline(
  state: boolean = false,
  action: {type: string; payload: any},
) {
  switch (action.type) {
    case SET_NETWORK:
      return action.payload;
    default:
      return state;
  }
}

export default {
  isOnline,
};
