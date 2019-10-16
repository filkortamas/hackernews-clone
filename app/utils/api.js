export function fetchStory(storyId) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
    .then(res => res.json())
    .then(data => data);
}

export function fetchStories(category, limit = 50) {
  return fetch(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
    .then(res => res.json())
    .then(storyIds => {
      if (!storyIds) {
        throw new Error('Error');
      }

      return Promise.all(
        storyIds.slice(0, limit).map(storyId => fetchStory(storyId))
      );
    });
}
