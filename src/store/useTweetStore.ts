import { create } from "zustand";

interface Tweet {
  id: number;
  content: string;
  likes: number;
}

interface TweetStore {
  tweets: Tweet[];
  addTweet: (content: string) => void;
  likeTweet: (id: number) => void;
}

export const useTweetStore = create<TweetStore>(set => ({
  tweets: [],
  addTweet: content =>
    set(state => ({
      tweets: [...state.tweets, { id: Date.now(), content, likes: 0 }],
    })),
  likeTweet: id =>
    set(state => ({
      tweets: state.tweets.map(tweet => (tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet)),
    })),
}));
