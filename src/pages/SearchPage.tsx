import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string,
}
export default function SearchPage() {
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [opening, setOpening] = useState("Loading...");
    const { city } = useParams();
    const { results, isLoading } = useSearchRestaurants(searchState, city);

    function setSearchQuery(searchFormData: SearchForm) {
        setOpening("Loading...");
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    }

    function resetSearch() {
        setOpening("Loading...");
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    }

    function setPage(page: number) {
        setOpening("Loading...");
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }))
    }

    function setSelectedCuisines(selectedCuisines: string[]) {
        setOpening("Loading...");
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    }

    function setSortOption(sortOption: string) {
        setOpening("Loading...");
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }))
    }

    if (isLoading) {
        //TODO: Add  loading skeleton here
        <span><Loader2 className="animate-spin" />Loading</span>
    }
    if (!results?.data) {
        const timeOut1 = setTimeout(() => (
            setOpening("Checking for restaurants in your city...")
        ), 5000);
        timeOut1;
        const timeOut2 = setTimeout(() => (
            setOpening("Collecting data from our gremlins around the globe...")
        ), 5000);
        timeOut2;
        const timeOut3 = setTimeout(() => (
            setOpening("No results found.")
        ), 5000);
        timeOut3;
        return <h1>{opening}</h1>;
    }

    if (!city) {
        //TODO: List all the restaurants in the database.
        // return (
        //     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        //         <div id="cuisines-list">
        //             Insert cuisines here.
        //         </div>
        //         <div id="main-content" className="flex flex-col">
        //             <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by Cuisine or Restaurant Name" onReset={resetSearch} />
        //             <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row ">
        //                 <span>
        //                     {results.pagination.total} Restaurant(s) found in {city}{" "}
        //                     <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
        //                 </span>
        //                 <div>
        //                     Insert sort dropdown here.
        //                     insert currency selector here
        //                 </div>
        //             </div>
        //             {results.data.map((restaurant) => (
        //                 <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        //             ))}
        //         </div>
        //     </div>
        // )
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded(!isExpanded)}
                />
            </div>
            <div id="main-content" className="flex flex-col">
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by Cuisine or Restaurant Name" onReset={resetSearch} />
                <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row mt-2">
                    <span>
                        {results.pagination.total} Restaurant(s) found in {city}{" "}
                        <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
                    </span>
                    <div>
                        <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                    </div>
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}
