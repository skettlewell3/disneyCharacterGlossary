export default function CharacterToolbar ({ 
    page, 
    onNext, 
    onPrev, 
    totalPages,
    onSortIdAsc,
    onSortIdDesc,
    onSortABC,
    onSortZYX,
    searchQuery,
    onSearch

}) {
    return (
        <div className="w-full flex justify-between items-center bg-gray-700 text-white p-4 rounded-md mb-6">
            <button
                onClick={onPrev}
                disabled={page <= 1}
                className="bg-gray-500 px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ← Prev
            </button>

            <span className="flex gap-2">
                <button
                    onClick={onSortIdAsc}
                    className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                >
                    ↑ ID
                </button>
                <button
                    onClick={onSortIdDesc}
                    className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                >
                    ↓ ID
                </button>
                <button
                    onClick={onSortABC}
                    className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                >
                    A B C
                </button>
                <button
                    onClick={onSortZYX}
                    className="bg-gray-500 px-2 py-1 rounded hover:bg-gray-600"
                >
                    Z Y X
                </button>
            </span>

            <span className="font-semibold">
                Page {page} {totalPages ? `of ${totalPages}` : ""}
            </span>

            <span className="flex gap-2">
                <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                />
            </span>

            <button
                onClick={onNext}
                disabled={page >= totalPages}
                className="bg-gray-500 px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next →
            </button>
        </div>
    )
}