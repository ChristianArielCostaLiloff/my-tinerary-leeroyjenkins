import React, { useEffect, useRef } from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import NoElementsFound from '../components/NoElementsFound';
import { useDispatch, useSelector } from 'react-redux';
import hotelActions from '../redux/actions/hotelActions';


export default function Hotels() {
  let searchBar = useRef();
  let select = useRef();
  let { hotels, filter } = useSelector(store => store.hotelReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if ((!filter.name || !filter.sort) && hotels.length < 1) {
      dispatch(hotelActions.getHotels());
    } else {
      dispatch(hotelActions.getHotelsByNameAndSorted(filter));
    }
  }, []);

  let handleChange = () => {
    let filters = {
      sort: select.current.value,
      name: searchBar.current.value,
    };
    dispatch(hotelActions.getHotelsByNameAndSorted(filters));
  };


  return (
    <>
      <div className="base-cities">
        <div className="cities-nav" id="hotels-nav">
          <form className="nav_form" onChange={handleChange}>
            <div className="select">
              <select ref={select} name="format" id="format" className='sele'>
                <option defaultValue value=''>Order by capacity</option>
                <option value="desc">From high to low</option>
                <option value="asc">From low to high</option>
              </select>
            </div>
            <SearchBar reference={searchBar} value={filter.name}/>
          </form>
        </div>
        <div className="card-container">
          {hotels.length > 0 ? (
            hotels.map((hotel) => {
              return (
                <Card type='hotel' element={hotel} key={hotel.id} editMode={false}>
                  Capacity: {hotel.capacity}
                </Card>
              );
            })
          ) : (
            <NoElementsFound />
          )}
        </div>
      </div>
    </>
  )
}
