import type {AnyAction} from 'redux';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit: string): AnyAction {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit: string) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestPosts(subreddit: string) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit: string, json: any) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now(),
  };
}

function fetchPosts(subreddit: string) {
  return (dispatch: any) => {
    dispatch(requestPosts(subreddit));
    console.info('开始请求');
    return fetch(`http://192.168.1.110:86/api/reactjs`, {
      method: 'POST',
      body: JSON.stringify({type: subreddit}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // console.log('response', response);
        return response.json();
      })
      .then(json => {
        // console.log(json);
        dispatch(receivePosts(subreddit, json));
      })
      .catch(err => {
        console.error('请求失败', err);
        dispatch(invalidateSubreddit(subreddit));
      });
  };
}

function shouldFetchPosts(state: any, subreddit: any) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit: string) {
  // 返回antion 对象， store
  return (dispatch: any, getState: any) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
