import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchStories } from '../utils/api';
import Loading from './Loading';
import Post from './Post';

export default class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null
    };
  }

  componentDidMount() {
    fetchStories(this.props.category)
      .then(posts => this.setState({posts}))
      .catch(error => { 
        console.error(error.message)
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <>
      {posts ?
      <ul>
        {posts.map(post => <Post post={post} key={post.id} />)}
      </ul>
      : <Loading />}
      </>
    )
  }
}

Stories.defaultProps = {
  category: 'top'
};