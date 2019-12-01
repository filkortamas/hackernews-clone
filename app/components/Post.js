import React from 'react';
import queryString from 'query-string';

import { fetchStory, fetchComments } from '../utils/api';
import Loading from './Loading';
import CommentList from './CommentList';
import MetaInfo from './MetaInfo';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      postIsLoading: true,
      comments: null,
      commentsIsLoading: true,
      error: null
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchStory(id)
      .then(post => {
        this.setState({ post, postIsLoading: false });
        return fetchComments(post.kids);
      })
      .then(comments => this.setState({ comments, commentsIsLoading: false }))
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const {
      post,
      postIsLoading,
      comments,
      commentsIsLoading,
      error
    } = this.state;

    if (error) {
      return <h2 className="error">{error}</h2>;
    }

    return (
      <>
        {postIsLoading ? (
          <Loading text="Fetching post" />
        ) : (
          <>
            <h1 className="header">
              <a className="link" href={post.url}>
                {post.title}
              </a>
            </h1>
            <MetaInfo
              by={post.by}
              time={post.time}
              id={post.id}
              descendants={post.descendants}
            />
            {commentsIsLoading ? (
              <Loading text="Fetching comments" />
            ) : (
              <CommentList comments={comments} />
            )}
          </>
        )}
      </>
    );
  }
}
