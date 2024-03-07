import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationSelector({ page, pages, onPageChange }: Props) {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length === 1) {
        return null
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page !== 1 &&
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    }
                </PaginationItem>
                {pageNumbers.map((number) => (
                    <PaginationItem>
                        <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {page !== pageNumbers.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}