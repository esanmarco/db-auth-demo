"use client";

import { MdOutlineDelete, MdOutlineMailOutline } from "react-icons/md";
import { useAuthContext } from "../(base)/components/FirebaseProvider";
import { useDeleteLeadById, useMyLeads } from "../hooks/leads";

export default function CurrentLeadList() {
  const { user } = useAuthContext();
  const { data, isLoading } = useMyLeads(user?.uid);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!data?.length && <p className="text-gray-400">No leads yet</p>}
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>
                <div className="flex flex-row justify-end gap-3">
                  <a target="_blank" href={`mailto:${lead.email}`}>
                    <MdOutlineMailOutline size={17} />
                  </a>
                  <DeleteLead id={lead.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const DeleteLead = ({ id }: { id: string }) => {
  const { mutate, isLoading } = useDeleteLeadById();
  return (
    <button className={isLoading ? "loading" : ""} onClick={() => mutate(id)}>
      <MdOutlineDelete size={17} />
    </button>
  );
};
