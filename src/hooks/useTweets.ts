import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const fetchTweets = async () => {
  const res = await fetch("/api/tweets");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export function useTweets() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
  });

  // 트윗 작성
  const addTweetMutation = useMutation({
    mutationFn: async (newTweet: { content: string }) => {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTweet),
      });
      if (!res.ok) throw new Error("Error adding tweet");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] }),
  });

  // 트윗 수정
  const updateTweetMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      const res = await fetch(`/api/tweets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Error updating tweet");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] }),
  });

  // 트윗 삭제
  const deleteTweetMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/tweets/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting tweet");
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] }),
  });

  // 좋아요 업데이트
  const likeTweetMutation = useMutation({
    mutationFn: async (tweetId: number) => {
      const res = await fetch(`/api/tweets/${tweetId}/like`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Error liking tweet");
      return res.json();
    },
    onMutate: async (tweetId: number) => {
      await queryClient.cancelQueries({ queryKey: ["tweets"] });
      const previousTweets = queryClient.getQueryData<any[]>(["tweets"]);
      // Optimistically update: 해당 트윗의 좋아요 수를 1 증가
      if (previousTweets) {
        queryClient.setQueryData<any[]>(["tweets"], prev =>
          prev?.map(tweet => (tweet.id === tweetId ? { ...tweet, likes: tweet.likes + 1 } : tweet)),
        );
      }
      return { previousTweets };
    },
    onError: (err, tweetId, context: any) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousTweets) {
        queryClient.setQueryData(["tweets"], context.previousTweets);
      }
    },
    onSettled: tweetId => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  return {
    tweets: data,
    error,
    isLoading,
    addTweetMutation,
    updateTweetMutation,
    deleteTweetMutation,
    likeTweetMutation,
  };
}
