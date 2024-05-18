import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client';
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultCard";
import PagiNation from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<string[]>([]);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");


    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedHotelFacilities,
        maxPrice: selectedMaxPrice?.toString(),
        sortOption,
    }


    const { data: hotelData } = useQuery(["searchHotels", searchParams], async () => await apiClient.searchHotels(searchParams));
    const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) =>
            event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)
        );
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const type = event.target.value;
        setSelectedHotelTypes((prevTypes) =>
            event.target.checked ? [...prevTypes, type] : prevTypes.filter((prevType) => prevType !== type)
        );
    }

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;
        setSelectedHotelFacilities((prevFacilities) =>
            event.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((prevFacility) => prevFacility !== facility)
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by</h3>
                    <StarRatingFilter onChange={handleStarChange} selectedStars={selectedStars} />
                    <HotelTypesFilter onChange={handleTypeChange} selectedHotelTypes={selectedHotelTypes} />
                    <HotelFacilitiesFilter onChange={handleFacilityChange} selectedHotelFacilities={selectedHotelFacilities} />
                    <PriceFilter onChange={(number?: number) => setSelectedMaxPrice(number)} selectedPrice={selectedMaxPrice} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found {search.destination ? `in ${search.destination}` : ""}
                    </span>
                    <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className="border rounded-md">
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultsCard key={hotel._id} hotel={hotel} />
                ))}
                <div>
                    <PagiNation page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 0} onPageChange={(page) => setPage(page)} />
                </div>
            </div>

        </div>
    )
}

export default Search;