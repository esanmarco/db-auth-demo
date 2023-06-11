"use client";

import { useAuthContext } from "./components/FirebaseProvider";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between w-full h-16 px-8 bg-gray-100">
        Firebase Example
        {user && (
          <button className="p-2 px-3 text-sm text-white transition-all duration-75 bg-gray-600 rounded shadow active:scale-105 btn">
            Sign Out
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
