import React from 'react';
import queryString from 'query-string';

import { fetchStory } from '../utils/api';
import Loading from './Loading';
import Post from './Post';
import CommentList from './CommentList';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      comments: null
    };
  }

  fetchComments(commentIds) {
    if (!commentIds || commentIds.length === 0) {
      return;
    }

    Promise.all(
      commentIds.slice(0, 40).map(commentId => fetchStory(commentId))
    ).then(comments => {
      this.setState({
        comments: comments.filter(({ text, dead }) => !!text && !dead)
      });
    });
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchStory(id).then(post => {
      this.setState({ post });
      this.fetchComments(post.kids);
    });
  }

  render() {
    const { post, comments } = this.state;

    return (
      <>
        {post ? (
          <>
            <Post post={post} withHeader={true} key={post.id} />
            {comments ? (
              <CommentList comments={comments} />
            ) : (
              <Loading text="Fetching comments" />
            )}
          </>
        ) : (
          <Loading text="Fetching post" />
        )}
      </>
    );
  }
}
