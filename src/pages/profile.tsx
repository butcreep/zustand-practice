// src/pages/profile.tsx
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  const { profile, isLoading, updateProfileMutation } = useProfile();
  const [nickname, setNickname] = useState(profile?.nickname || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  if (isLoading) return <div>Loading...</div>;

  const handleProfileUpdate = () => {
    // 프로필 이미지 업로드는 별도 API를 고려할 수 있지만, 여기서는 간단히 파일 객체를 문자열로 대체
    updateProfileMutation.mutate({
      nickname,
      profileImage: profileImage ? profileImage.name : profile.profileImage,
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">프로필 업데이트</h1>
      <div className="mb-4">
        <label className="block">닉네임:</label>
        <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block">프로필 사진:</label>
        <input
          type="file"
          onChange={e => setProfileImage(e.target.files ? e.target.files[0] : null)}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleProfileUpdate} className="bg-blue-500 text-white p-2">
        업데이트
      </button>
      <div className="mt-4">
        <h2 className="font-bold">현재 프로필</h2>
        <p>닉네임: {profile.nickname}</p>
        <img src={profile.profileImage} alt="Profile" className="w-20 h-20 rounded-full" />
      </div>
    </div>
  );
}
