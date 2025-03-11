import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">트위터 클론</div>
      <div>
        <Link href="/profile" className="flex items-center space-x-2">
          <Image
            src="/default-profile.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={32} // width와 height는 필수
            height={32}
          />
          <span>프로필</span>
        </Link>
      </div>
    </nav>
  );
}
