import instance from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";
const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  // $q=spider 에서 spider만 분리하기
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  let query = useQuery();
  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(query.get("q"), 500);
  // console.log(debounceSearchTerm);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);
  console.log(debounceSearchTerm);
  //spider영화들 요청하기
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      // console.log(response);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  // 검색창에 입력한 것 화면에 뿌려주기
  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImgUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__colum-poster"
                >
                  <img
                    src={movieImgUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
    // 영화가 없을 때
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 {searchTerm}에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
