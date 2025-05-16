import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import {useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [min, setMin] = useState(location.state?.min || 0);
  const [max, setMax] = useState(location.state?.max || 10000);
  const [dates, setDates] = useState(location.state?.dates || [{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });
  const [url, setUrl] = useState(`http://localhost:8800/api/hotels?city=${destination}&min=${min}&max=${max}`);

  const { data, loading, error, reFetch } = useFetch(url);
 
  useEffect(() => {
    if (destination) {
      setUrl(`http://localhost:8800/api/hotels?city=${destination}&min=${min}&max=${max}`);
    }
  }, []);

  // Fetch data when `url` changes (only after clicking "Search")
  useEffect(() => {
    if (url) reFetch();
  }, [url]); // Only runs when `url` updates

  const handleClick = () => {
    const newUrl = `http://localhost:8800/api/hotels?city=${destination}&min=${min}&max=${max}`;
    setUrl(newUrl); // Set URL state
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder="Enter destination" value={destination} onChange={(e) => setDestination(e.target.value)} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>per night</small></span>
                  <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>per night</small></span>
                  <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input type="number" min={1} value={options.adult} onChange={(e) => setOptions({ ...options, adult: e.target.value })} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" min={0} value={options.children} onChange={(e) => setOptions({ ...options, children: e.target.value })} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" min={1} value={options.room} onChange={(e) => setOptions({ ...options, room: e.target.value })} className="lsOptionInput" />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <div className="loading">Loading hotels...</div>
            ) : error ? (
              <div className="error">Error loading hotels: {error.message}</div>
            ) : data && data.length > 0 ? (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            ) : (
              <div className="noResults">{destination ? "No hotels found. Try different search criteria." : "Please enter a destination to search for hotels."}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default List;