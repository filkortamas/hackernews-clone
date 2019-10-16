import React from 'react';
import { Link } from 'react-router-dom';

export default function Post(props) {
  const { by, descendants, id, time, title, url } = props.post;
  const dateTime = new Date(time * 1000);

  return (
    <li className="post">
      <a className="link" href={url}>
        {title}
      </a>
      <div className="meta-info-light">
        <span>
          by <Link to={`/user?id=${by}`}>{by}</Link>
        </span>
        <span>
          on{' '}
          {`${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}, ${dateTime.getHours()}:${
            dateTime.getMinutes().toString().length > 1 ? '' : '0'
          }${dateTime.getMinutes()}`}
        </span>
        <span>
          with <Link to={`post?id=${id}`}>{descendants}</Link> comments
        </span>
      </div>
    </li>
  );
}
