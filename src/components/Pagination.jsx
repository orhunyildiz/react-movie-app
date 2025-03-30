export default function Pagination({ nextPage, previousPage, currentPage, totalPages, onPageChange }) {
    // Helper function to restrict the page numbers displayed
    const getPageNumbers = (currentPage, totalPages) => {
        const delta = 5; // Number of pages to show around the current page
        const range = [];
        const rangeWithDots = [];
        let l;

        // Always include the first, last, and pages around the current page
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        // Insert "..." if there's a gap between page numbers
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("dots-" + i); // Use a unique identifier for dots
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <nav>
            <ul className="pagination d-flex justify-content-center">
                {/* Previous Page */}
                <li className={currentPage !== 1 ? "page-item" : "page-item disabled"}>
                    <button className="page-link" onClick={previousPage}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </li>
                {/* Page Numbers */}
                {pageNumbers.map((page, index) =>
                    typeof page === "string" && page.startsWith("dots-") ? (
                        <li key={page} className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    ) : (
                        <li key={`page-${page}`} className={page === currentPage ? "page-item active" : "page-item"}>
                            <button className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </button>
                        </li>
                    )
                )}
                {/* Next Page */}
                <li className={currentPage < totalPages ? "page-item" : "page-item disabled"}>
                    <button className="page-link" onClick={nextPage}>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
