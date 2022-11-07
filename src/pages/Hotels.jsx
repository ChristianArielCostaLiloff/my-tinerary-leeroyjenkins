import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import { hotel as hotelsData } from "../data/hotels"
import NoElementsFound from '../components/NoElementsFound'
import { json } from 'react-router-dom'

export default function Hotels() {
    let [hotel, setHotel] = useState(hotelsData);

    useEffect(() => {
        let mainNavBar = document.getElementById("hotels-nav");
        mainNavBar.addEventListener("input", showSortedCard);
    }, []);

    let showSortedCard = () => {
        let searchText = document.getElementById("search-text").value.toLowerCase();
        let selectSort = document.getElementById("format").value.toLowerCase();
        if (selectSort === 'low') {
            hotel.sort((a, b) => a.capacity - b.capacity)
        }
        if (selectSort === 'high') {
            hotel.sort((a, b) => b.capacity - a.capacity)
        }
        let sortedHotels = hotel.filter(hotel => hotel.name.toLowerCase().includes(searchText))
        setHotel(sortedHotels)
        console.log("Filtered by: SortedPer: " + selectSort + " Text: " + searchText);
        localStorage.setItem("filterHotel", JSON.stringify({ text: searchText, sortPer: selectSort }))
    };
    return (
        <>
            <div className="base-cities">
                <div className="cities-nav" id="hotels-nav">
                    <div className="select">
                        <select name="format" id="format">
                            <option defaultValue>Order by capacity</option>
                            <option value="high">From high to low</option>
                            <option value="low">From low to high</option>
                        </select>
                    </div>
                    <SearchBar />
                </div>
                <div className="card-container">
                    {hotel.length > 0 ? (

                        hotel.map((hotel) => {
                            return (
                                <Card city={hotel} key={hotel.id}>
                                    Capacity: {hotel.capacity}
                                </Card>)
                        })
                    ) : (
                        <NoElementsFound />
                    )}
                </div>
            </div>
        </>
    )
}
