import { Link, useSearchParams } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";
import { useFetch } from "use-http";

export default function FindHotel() {
  const [params] = useSearchParams();
  const searchTerm = params.get("searchTerm");
  const {
    data: hotels,
    loading,
    error,
  } = useFetch<HotelDto[]>(
    "/api/hotels/SearchForHotel?searchTerm="+ searchTerm ,
    {
      method: "get",
    },
    [searchTerm]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error... <button type="button"> try again</button>
      </div>
    );
  }

  return (
    <div>
      <p>{searchTerm}</p>
      <div>Found these hotels</div>
      <ul>
        {hotels?.map((hotel) => (
          <li key={hotel.id}>
            <Link to={`/hotel-details/${hotel.id}`}>{hotel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}