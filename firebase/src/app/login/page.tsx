"use client";

import { useAuthContext } from "../(base)/components/FirebaseProvider";

export default function LoginPage() {
  const { actions } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button
        onClick={() => actions.signin()}
        className="p-3 px-5 text-white transition-all duration-75 bg-blue-500 rounded shadow active:scale-105 btn"
      >
        Sign In With Google
      </button>
    </div>
  );
}
