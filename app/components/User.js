import React from 'react';
import queryString from 'query-string';

import Loading from './Loading';
import Post from './Post';
import { ThemeContext } from '../context/theme';

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
          posts: posts.filter(({ deleted, title }) => !deleted && !!title)
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
            <ThemeContext.Consumer>
              {({ theme }) => (
                <div className={`meta-info-${theme}`}>
                  <span>
                    joined
                    <strong> {getFormatedDateFromNumber(user.created)} </strong>
                  </span>
                  <span>
                    has <strong>{tousandSeparator(user.karma)}</strong> karma
                  </span>
                </div>
              )}
            </ThemeContext.Consumer>
            <p dangerouslySetInnerHTML={{ __html: user.about }} />
            {posts ? (
              <>
                <h2>Posts</h2>
                <ul>
                  {posts.map(
                    post =>
                      post && (
                        <li className="post" key={post.id}>
                          <Post post={post} />
                        </li>
                      )
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
