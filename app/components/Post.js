import React from 'react';
import { Link } from 'react-router-dom';

import { getFormatedDateFromNumber } from '../utils';

export default function Post({ titleClass, ...restProps }) {
  const { by, descendants, id, time, title, url } = restProps.post;

  return (
    <li className="post">
      <a className={`link ${titleClass}`} href={url}>
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
