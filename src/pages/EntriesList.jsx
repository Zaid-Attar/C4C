import EntryTable from '../components/EntryTable';

export default function EntriesList() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-base-content mb-3 tracking-tight">All Entries</h1>
        <p className="text-base-content/60 text-base max-w-lg mx-auto">Browse and search feedback submitted so far.</p>
      </div>

      {/* showActions=false — regular users just view, don't get approve/flag/delete */}
      <EntryTable showActions={false} />
    </div>
  );
}
