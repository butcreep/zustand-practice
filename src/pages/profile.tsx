// src/pages/profile.tsx
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import Image from "next/image";

export default function Profile() {
  const { profile, isLoading, updateProfileMutation } = useProfile();
  const [nickname, setNickname] = useState(profile?.nickname || "");
  // 프로필 사진은 실제 파일 업로드 대신 파일명 정도로 대체
  const [profileImage, setProfileImage] = useState<string>(profile?.profileImage || "");

  if (isLoading) return <div>Loading...</div>;

  const handleProfileUpdate = () => {
    updateProfileMutation.mutate({ nickname, profileImage });
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
        <input type="file" onChange={e => setProfileImage(e.target.value)} className="border p-2 w-full" />
      </div>
      <button onClick={handleProfileUpdate} className="bg-blue-500 text-white p-2">
        업데이트
      </button>
      <div className="mt-4">
        <h2 className="font-bold">현재 프로필</h2>
        <p>닉네임: {profile.nickname}</p>
        <Image src={profile.profileImage} alt="Profile" className="rounded-full" width={32} height={32} />
      </div>
    </div>
  );
}
