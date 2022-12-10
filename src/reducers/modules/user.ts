import {SET_NETWORK} from '@/actions/utils';

/**
 * 是否联网
 */
function user(state: any = {}, action: {type: any; payload: any}) {
  switch (action.type) {
    case SET_NETWORK:
      return action.payload;
    default:
      return state;
  }
}

export default {
  user,
};
