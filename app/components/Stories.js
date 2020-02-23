import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchStories } from '../utils/api';
import Loading from './Loading';
import MetaInfo from './MetaInfo';

export default class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetchStories(this.props.category)
      .then(posts => {
        this.setState({ posts, loading: false, error: null });
      })
      .catch(error => {
        this.setState({ loading: false, error: error.message });
      });
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <h2 className="error">{error}</h2>;
    }

    return (
      <>
        <ul>
          {posts.map(
            post =>
              post && (
                <li className="post" key={post.id}>
                  <a className="link" href={post.url}>
                    {post.title}
                  </a>
                  <MetaInfo
                    by={post.by}
                    time={post.time}
                    id={post.id}
                    descendants={post.descendants}
                  />
                </li>
              )
          )}
        </ul>
      </>
    );
  }
}

Stories.defaultProps = {
  category: 'top'
};
