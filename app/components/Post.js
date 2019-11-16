import React from 'react';

import MetaInfo from './MetaInfo';

export default function Post({ post, withHeader }) {
  const { by, descendants, id, time, title, url } = post;

  const link = (
    <a className="link" href={url}>
      {title}
    </a>
  );

  return (
    <>
      {withHeader ? <h1 className="header">{link}</h1> : link}
      <MetaInfo by={by} time={time} id={id} descendants={descendants} />
    </>
  );
}
