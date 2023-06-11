import AddNewLead from "../(shared)/AddNewLead";
import CurrentLeadList from "../(shared)/CurrentLeadList";
import PotentialLeads from "../(shared)/PotentialLeads";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen gap-5 p-24">
      <div className="grid w-full grid-cols-3 divide-x">
        <div className="px-4">
          <h2 className="mb-2 text-xl text-bold">Current Leads</h2>
          <CurrentLeadList />
        </div>

        <div className="px-4">
          <h2 className="mb-2 text-xl text-bold">Add New Lead</h2>
          <AddNewLead />
        </div>

        <div className="px-4">
          <h2 className="mb-2 text-xl text-bold">Potential Leads</h2>
          <PotentialLeads />
        </div>
      </div>
    </main>
  );
}
