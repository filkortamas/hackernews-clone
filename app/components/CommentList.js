import React from 'react';

import MetaInfo from './MetaInfo';

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.map(({ by, id, time, text }) => (
        <li className="comment" key={id}>
          <MetaInfo by={by} time={time} />
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </li>
      ))}
    </ul>
  );
}
