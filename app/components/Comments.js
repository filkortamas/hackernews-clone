import React from 'react';
import queryString from 'query-string';

import { fetchStory } from '../utils/api';
import Loading from './Loading';
import Post from './Post';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchStory(id).then(post => this.setState({ post }));
  }

  render() {
    const { post } = this.state;

    return (
      <>
        {post ? (
          <>
            <Post post={post} titleClass="link--big" key={post.id} />
          </>
        ) : (
          <Loading text="Fetching post" />
        )}
      </>
    );
  }
}
