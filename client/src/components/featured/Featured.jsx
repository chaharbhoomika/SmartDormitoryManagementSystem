import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=Delhi,Mumbai,Agra"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem" >
            <img
              src="https://images.squarespace-cdn.com/content/v1/5e72c8bfe21ad940ba788673/1620923464746-9P9CHDE3GWWYHK2WWALV/hostel-dorm-bedroom-two.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="http://images.jdmagicbox.com/comp/thanjavur/f5/9999p4362.4362.171210121517.i9f5/catalogue/vijayam-ladies-hostel-rajah-serfoji-government-college-thanjavur-hostels-for-women-8zpws.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/originals/f6/c9/a3/f6c9a3cbb33bc8bbed47844c4b7852ae.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Agra</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;