"use client";

export default function AddNewLead() {
  return (
    <form className="flex flex-col gap-2">
      <input
        name="name"
        placeholder="Name"
        className="px-3 py-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="px-3 py-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="px-3 py-2 text-sm text-white bg-blue-400 rounded w-fit"
      >
        Add
      </button>
    </form>
  );
}
