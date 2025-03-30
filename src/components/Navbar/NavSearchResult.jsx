export default function NavSearchResult({ totalResults }) {
    return (
        <div className="col-4 text-end">
            <strong>{totalResults}</strong> records found.
        </div>
    );
}
