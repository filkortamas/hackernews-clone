import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ text }) => ({
        text: text.includes('...') ? text.replace('...', '') : `${text}.`
      }));
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <h3>{this.state.text}</h3>;
  }
}

Loading.defaultProps = {
  text: 'Loading'
};
