"use client";

import { signOut } from "firebase/auth";
import { auth, useAuthContext } from "./components/FirebaseProvider";

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
          <button onClick={() => signOut(auth)} className="btn btn-primary">
            Sign Out
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
