import React from 'react';
import { Link } from 'react-router-dom';

import { getFormatedDateFromNumber } from '../utils';

export default function MetaInfo({ by, time, id, descendants }) {
  return (
    <div className="meta-info-light">
      <span>
        by <Link to={`/user?id=${by}`}>{by}</Link>
      </span>
      <span>on {getFormatedDateFromNumber(time)}</span>
      {id && descendants && (
        <span>
          with <Link to={`post?id=${id}`}>{descendants}</Link> comments
        </span>
      )}
    </div>
  );
}
