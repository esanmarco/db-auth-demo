"use client";

import React from "react";
import {
  onAuthStateChanged,
  getAuth,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type ValueProvider = {
  user: User | null;
  actions: any;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const AuthContext = React.createContext<ValueProvider>({
  user: null,
  actions: {},
});
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        Cookies.set("auth", JSON.stringify(user));
      } else {
        setUser(null);
        Cookies.remove("auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Get unauthorized users out of here
  React.useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  async function signin() {
    let result = null;
    let error = null;

    try {
      result = signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;

          if (user) {
            router.push("/");
          }

          return {
            token,
            user,
          };
        })
        .catch((error) => {
          // Handle Errors here.
          console.log(error);
        });
    } catch (e) {
      error = e;
    }

    return { result, error };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        actions: {
          signin,
        },
      }}
    >
      {loading ? (
        <div className="flex justify-center w-full h-screen">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
