// src/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const fetchProfile = async () => {
  const res = await fetch("/api/profile");
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export function useProfile() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(["profile"], fetchProfile, {
    // 초기 프로필 데이터를 설정할 수도 있음
    initialData: { nickname: "사용자", profileImage: "/default-profile.png" },
  });

  const updateProfileMutation = useMutation(
    async (updates: { nickname?: string; profileImage?: string }) => {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Error updating profile");
      return res.json();
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["profile"]),
    },
  );

  return { profile: data, error, isLoading, updateProfileMutation };
}
