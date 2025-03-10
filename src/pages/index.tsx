import { useState } from "react";
import { useTweetStore } from "../store/useTweetStore";
import Tweet from "../components/Tweet";

export default function Home() {
  const [content, setContent] = useState("");
  const { tweets, addTweet } = useTweetStore();

  return (
    <div className="max-w-md mx-auto p-4">
      <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border" />
      <button
        onClick={() => {
          addTweet(content);
          setContent("");
        }}
        className="p-2 bg-blue-500 text-white"
      >
        트윗하기
      </button>
      <div>
        {tweets.map(tweet => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
}
