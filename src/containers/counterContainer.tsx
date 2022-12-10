import React, {useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Picker, Posts} from '../pages';

import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from '../actions';

function Counter({
  selectedSubreddit,
  lastUpdated,
  isFetching,
  posts,
  didInvalidate,
  dispatch,
}: any) {
  useEffect(() => {
    console.info('useEffect', selectedSubreddit);
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const handleChange = (nextSubreddit: string) => {
    dispatch(selectSubreddit(nextSubreddit));
  };

  const handleRefreshClick = () => {
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };
  return (
    <>
      <View>
        <Picker
          value={selectedSubreddit}
          onChange={handleChange}
          options={['reactjs', 'frontend']}
        />
        <View>
          {lastUpdated && (
            <View>
              <Text>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
              </Text>
            </View>
          )}
          {didInvalidate && (
            <View>
              <Text>请求失败</Text>
            </View>
          )}
          {!isFetching && (
            <TouchableHighlight onPress={handleRefreshClick}>
              <View>
                <Text>刷新</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
        {isFetching && posts.length === 0 && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        {!isFetching && posts.length === 0 && (
          <View>
            <Text>暂无更多数据</Text>
          </View>
        )}
        {posts.length > 0 && (
          <View style={{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={posts} />
          </View>
        )}
      </View>
    </>
  );
}

const CounterContainer = connect((state: any) => {
  const {selectedSubreddit, postsBySubreddit} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
    didInvalidate,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    didInvalidate,
  };
})(Counter);

export default CounterContainer;
