import React, { useState } from 'react';
import StarRatingFilter from './StarRatingFilter';
import HotelTypesFilter from './HotelTypesFilter';
import HotelFacilitiesFilter from './HotelFacilitiesFilter';
import PriceFilter from './PriceFilter';

const Filter = ({
    handleStarChange,
    selectedStars,
    handleTypeChange,
    selectedHotelTypes,
    handleFacilityChange,
    selectedHotelFacilities,
    setSelectedMaxPrice,
    selectedMaxPrice
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lg:rounded-lg lg:border lg:border-slate-300 lg:p-5 lg:h-fit lg:sticky lg:top-10">
            <div className="lg:hidden p-5 bg-slate-300 rounded-lg cursor-pointer" onClick={toggleFilter}>
                <h3 className="text-lg font-semibold">Filter by</h3>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-5 p-5 lg:p-0`}>
                <h3 className="hidden lg:block text-lg font-semibold border-b border-slate-300 pb-5">Filter by</h3>
                <StarRatingFilter onChange={handleStarChange} selectedStars={selectedStars} />
                <HotelTypesFilter onChange={handleTypeChange} selectedHotelTypes={selectedHotelTypes} />
                <HotelFacilitiesFilter onChange={handleFacilityChange} selectedHotelFacilities={selectedHotelFacilities} />
                <PriceFilter onChange={(number) => setSelectedMaxPrice(number)} selectedPrice={selectedMaxPrice} />
            </div>
        </div>
    );
};

export default Filter;
