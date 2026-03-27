"use client";

import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();      // removes cookies
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition text-white"
    >
      Logout
    </button>
  );
}