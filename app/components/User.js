import React from 'react';
import queryString from 'query-string';

import Loading from './Loading';
import Post from './Post';

import { fetchUser, fetchStory } from '../utils/api';
import { getFormatedDateFromNumber, tousandSeparator } from '../utils';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      posts: null
    };
  }

  fetchUserStories(storyIds) {
    if (!storyIds || storyIds.length === 0) {
      return;
    }

    Promise.all(storyIds.slice(0, 30).map(storyId => fetchStory(storyId))).then(
      posts => {
        this.setState({
          posts: posts.filter(post => !post.deleted && !!post.title)
        });
      }
    );
  }

  componentDidMount() {
    const { id: username } = queryString.parse(this.props.location.search);
    fetchUser(username).then(user => {
      this.setState({ user });
      this.fetchUserStories(user.submitted);
    });
  }

  render() {
    const { user, posts } = this.state;

    return (
      <>
        {user ? (
          <>
            <h1 className="header">{user.id}</h1>
            <div className="meta-info-light">
              <span>
                joinded
                <strong> {getFormatedDateFromNumber(user.created)} </strong>
              </span>
              <span>
                has <strong>{tousandSeparator(user.karma)}</strong> karma
              </span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: user.about }} />
            {posts ? (
              <>
                <h2>Posts</h2>
                <ul>
                  {posts.map(
                    post => post && <Post post={post} key={post.id} />
                  )}
                </ul>
              </>
            ) : (
              <Loading text="Fetching posts" />
            )}
          </>
        ) : (
          <Loading text="Fetching user" />
        )}
      </>
    );
  }
}
