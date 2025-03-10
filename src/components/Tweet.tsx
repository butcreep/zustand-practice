import { useTweetStore } from "../store/useTweetStore";

const Tweet = ({ id, content, likes }: { id: number; content: string; likes: number }) => {
  const likeTweet = useTweetStore(state => state.likeTweet);

  return (
    <div className="p-4 border-b">
      <p>{content}</p>
      <button onClick={() => likeTweet(id)}>❤️ {likes}</button>
    </div>
  );
};

export default Tweet;
