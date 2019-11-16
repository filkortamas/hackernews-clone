import React from 'react';

export default function PostLink({ url, text }) {
  console.log(url, text);
  return (
    <a className="link" href={url}>
      {text}
    </a>
  );
}
