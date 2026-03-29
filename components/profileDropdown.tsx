"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

const ProfileDropdown = ({ userName }: { userName: string }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <Image
          src="/user-avatar.png"
          alt="profile"
          width={36}
          height={36}
          className="rounded-full border border-gray-700"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-[#111827] border border-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium">{userName}</p>
          </div>

          <Link
            href="/profile"
            className="block px-4 py-3 hover:bg-gray-800 text-sm"
          >
            Profile
          </Link>

          <div className="border-t border-gray-800">
            <div className="px-4 py-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;