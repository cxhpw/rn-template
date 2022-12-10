import React from 'react';
import {View, Text, ScrollView} from 'react-native';
type Post = {
  value: string;
  author: string;
};
type Props = {
  posts: Array<Post>;
};
const Posts: React.FC<Props> = ({posts}) => {
  return (
    <>
      <ScrollView style={{height: 200}}>
        <View>
          {posts.map((post, i) => {
            return (
              <View key={i}>
                <Text>{post.author}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Posts;
