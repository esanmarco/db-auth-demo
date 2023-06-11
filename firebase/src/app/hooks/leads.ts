"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { firebaseApp } from "../(base)/components/FirebaseProvider";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";

export interface Lead {
  id: string;
  name: string;
  email: string;
  uid: string;
}

const db = getFirestore(firebaseApp);

export function useFetchPotentialLeads() {
  return useQuery(["potential-leads"], async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  });
}

export function useMyLeads(uid: string | undefined) {
  return useQuery(
    ["my-leads"],
    async () => {
      const querySnapshot = query(
        collection(db, "leads"),
        where("uid", "==", uid)
      );
      const docs = getDocs(querySnapshot).then((docs) => {
        return docs.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Lead)
        );
      });
      return docs;
    },
    {
      enabled: !!uid,
    }
  );
}

export function useAddLead() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["potential-lead"],
    mutationFn: async (newLead: Partial<Lead>) => {
      await addDoc(collection(db, "leads"), newLead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-leads"]);
    },
  });
  return {
    ...mutate,
    isMutating: mutate.isLoading,
  };
}

export function useDeleteLeadById() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["delete-lead"],
    mutationFn: async (id: string) => {
      const document = doc(db, "leads", id);
      await deleteDoc(document);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-leads"]);
    },
  });
  return {
    ...mutate,
    isMutating: mutate.isLoading,
  };
}
