// src/pages/index.tsx
import { useState } from "react";
import { useTweets } from "../hooks/useTweets";
import { Tweet } from "../types/tweet";
import Navbar from "@/components/NavBar";

export default function Home() {
  const [newContent, setNewContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editingTweetId, setEditingTweetId] = useState<number | null>(null);
  const { tweets, isLoading, addTweetMutation, updateTweetMutation, deleteTweetMutation, likeTweetMutation } =
    useTweets();
  const handleAddTweet = () => {
    if (newContent.trim() === "") return;
    addTweetMutation.mutate({ content: newContent });
    setNewContent("");
  };

  const handleUpdateTweet = (id: number) => {
    if (editContent.trim() === "") return;
    updateTweetMutation.mutate({ id, content: editContent });
    setEditContent("");
    setEditingTweetId(null);
  };
  const handleModal = (id: number, currentContent: string) => {
    if (editingTweetId === id) {
      setEditingTweetId(null);
    } else {
      setEditingTweetId(id);
      setEditContent(currentContent); // 기존 내용 저장
    }
  };

  const handleLike = (id: number) => {
    likeTweetMutation.mutate(id);
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <Navbar />
      {/* 트윗 작성 */}
      <textarea
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
        className="w-full p-2 border"
        placeholder="새 트윗 작성..."
      />
      <button onClick={handleAddTweet} className="p-2 bg-blue-500 text-white my-2">
        트윗하기
      </button>

      {/* 트윗 목록 */}
      {tweets &&
        tweets.map((tweet: Tweet) => (
          <div key={tweet.id} className="p-4 border-b">
            <p>{tweet.content}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleLike(tweet.id)}> ❤️ ({tweet.likes})</button>
              <button onClick={() => deleteTweetMutation.mutate(tweet.id)}>삭제</button>
              <button onClick={() => handleModal(tweet.id, tweet.content)}>수정</button>
            </div>
            {/* 트윗 수정 입력란 */}
            {editingTweetId === tweet.id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  placeholder="수정 내용 입력..."
                  className="border p-1 mr-2"
                />
                <button onClick={() => handleUpdateTweet(tweet.id)} className="bg-green-500 text-white p-1">
                  수정
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
