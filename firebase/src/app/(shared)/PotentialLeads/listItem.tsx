"use client";

import { useAuthContext } from "@/app/(base)/components/FirebaseProvider";
import { useAddLead } from "@/app/hooks/leads";
import { MdAddTask } from "react-icons/md";

export default function ListItem({ name, email }: any) {
  const { user } = useAuthContext();
  const { mutate, isMutating } = useAddLead();

  return (
    <li className="flex flex-row items-center justify-between w-full mb-1">
      <div className="flex flex-col w-full">
        <span>{name}</span>
        <a href={`mailto:${email}`} className="text-sm text-blue-500 underline">
          {email}
        </a>
      </div>
      <button
        onClick={() =>
          mutate({
            name: name,
            email: email,
            uid: user!.uid,
          })
        }
        className={`hover:text-blue-500 ${isMutating ? "loading" : ""}`}
      >
        <MdAddTask size={24} />
      </button>
    </li>
  );
}
