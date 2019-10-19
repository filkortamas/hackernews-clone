import React from 'react';
import queryString from 'query-string';
import { fetchUser } from '../utils/api';
import Loading from './Loading';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const { id: username } = queryString.parse(this.props.location.search);
    fetchUser(username).then(user => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <>
        {this.state.user ? (
          <p>{JSON.stringify(this.state.user)}</p>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}
