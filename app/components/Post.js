import React from 'react';
import { Link } from 'react-router-dom';

import { getFormatedDateFromNumber } from '../utils';

export default function Post(props) {
  const { by, descendants, id, time, title, url } = props.post;

  return (
    <li className="post">
      <a className="link" href={url}>
        {title}
      </a>
      <div className="meta-info-light">
        <span>
          by <Link to={`/user?id=${by}`}>{by}</Link>
        </span>
        <span>on {getFormatedDateFromNumber(time)}</span>
        <span>
          with <Link to={`post?id=${id}`}>{descendants}</Link> comments
        </span>
      </div>
    </li>
  );
}
