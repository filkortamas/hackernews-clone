import React from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../context/theme';
import { getFormatedDateFromNumber } from '../utils';

export default function MetaInfo({ by, time, id, descendants }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={`meta-info-${theme}`}>
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
      )}
    </ThemeContext.Consumer>
  );
}
