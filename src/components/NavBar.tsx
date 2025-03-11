import Link from "next/link";
import Image from "next/image";
import { useThemeStore } from "@/store/useThemeStore";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useThemeStore();
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">Zuweeter</div>
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
        <button onClick={toggleDarkMode}>{darkMode ? "🌙" : "☀️"}</button>
      </div>
    </nav>
  );
}
