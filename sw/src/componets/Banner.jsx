import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import "./Banner.css";
import requests from "../api/requests";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러영화)
    const response = await instance.get(requests.fetchNowPlaying); //fetch와 같은 기능. ''주소 넣어주면 되는데 인스턴스 이미 만들었음

    // 여러 영화 중 영화 하나의 id가져오기
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { apppned_to_repoase: "videos" },
    });
    setMovie(movieDetail);
    console.log(movieDetail);
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };
  if (!movie) {
    return <div>loading...</div>;
  }

  if (!isClicked) {
    return (
      <div
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original.name}{" "}
          </h1>
          <div className="banner__button">
            {movie.videos?.results[0]?.key ? (
              <button onClick={() => setIsClicked(true)}>Play</button>
            ) : null}
          </div>
          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>
        <div className="banner-fadeBottom"></div>
      </div>
    );
  } else {
    <>
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}
          ></Iframe>
        </HomeContainer>
      </Container>
      <button onClick={() => setIsClicked(false)}>X</button>
    </>;
  }
};
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export default Banner;
