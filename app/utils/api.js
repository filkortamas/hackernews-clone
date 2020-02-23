export const fetchStory = storyId =>
  fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
    .then(res => res.json())
    .then(data => data);

export const fetchStories = (category, limit = 50) =>
  fetch(
    `https://hacker-news.firebaseio.com/v0/${category}stories.json?print=pretty`
  )
    .then(res => res.json())
    .then(storyIds => {
      if (!storyIds) {
        throw new Error('Error');
      }

      return Promise.all(
        storyIds.slice(0, limit).map(storyId => fetchStory(storyId))
      );
    });

export const fetchUser = username =>
  fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)
    .then(res => res.json())
    .then(data => data);

export const fetchComments = commentIds => {
  if (!commentIds || commentIds.length === 0) {
    return;
  }

  return Promise.all(
    commentIds.slice(0, 40).map(commentId => fetchStory(commentId))
  );
};

export const fetchUserStories = storyIds => {
  if (!storyIds || storyIds.length === 0) {
    return;
  }

  return Promise.all(storyIds.slice(0, 30).map(storyId => fetchStory(storyId)));
};
