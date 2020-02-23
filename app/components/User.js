import React from 'react';
import queryString from 'query-string';

import { ThemeContext } from '../context/theme';
import { fetchUser, fetchUserStories } from '../utils/api';
import { getFormatedDateFromNumber, tousandSeparator } from '../utils/helpers';
import Loading from './Loading';
import MetaInfo from './MetaInfo';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userIsLoading: true,
      posts: null,
      postsIsLoading: true,
      error: null
    };
  }

  componentDidMount() {
    const { id: username } = queryString.parse(this.props.location.search);
    fetchUser(username)
      .then(user => {
        this.setState({ user, userIsLoading: false });
        return fetchUserStories(user.submitted);
      })
      .then(posts => this.setState({ posts, postsIsLoading: false }))
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const { user, userIsLoading, posts, postsIsLoading, error } = this.state;

    if (error) {
      return <h2 className="error">{error}</h2>;
    }

    return (
      <>
        {userIsLoading ? (
          <Loading text="Fetching user" />
        ) : (
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
            {postsIsLoading ? (
              <Loading text="Fetching posts" />
            ) : (
              <>
                <h2>Posts</h2>
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
            )}
          </>
        )}
      </>
    );
  }
}
