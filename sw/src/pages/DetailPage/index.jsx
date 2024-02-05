import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../api/axios";
import styled from "styled-components";
import "./DetailPage.css";

const DetailPage = () => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동하기
  };
  const [overviewOpen, setOverviewOpen] = useState(false);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [overView, setOverView] = useState("");
  const [btnText, setBtnText] = useState("줄거리 보기");

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get(`/movie/${movieId}`);
      // console.log(movie.overview);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  const handleOverview = () => {
    setOverviewOpen((prev) => !prev);
    setOverView(movie.overview);
    setBtnText((prevBtnText) =>
      prevBtnText === "줄거리 보기" ? "줄거리 닫기" : "줄거리 보기"
    );
  };
  if (!movie) return null;

  return (
    <Section>
      <Image
        className="img"
        src={
          movie.backdrop_path !== null
            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            : "영화이미지가 존재하지 않습니다."
        }
        alt="movie_img"
      ></Image>

      <Details>
        <div className="text">
          <div className="title"></div>
          <div className="title">
            {movie.original_title ? movie.original_title : title ? title : null}
          </div>

          <div className="tagline">
            {overviewOpen ? overView : movie.tagline}
          </div>
        </div>

        <div className="button-div">
          <button onClick={onClickBtn}>검색 결과 다시 보기</button>
          {/* <Link to="/main"> */}
          <button onClick={handleOverview}>{btnText}</button> {/* </Link> */}
        </div>
      </Details>
    </Section>
  );
};

const Section = styled.div`
  height: 550px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 100px auto auto;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const Details = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
`;
export default DetailPage;
