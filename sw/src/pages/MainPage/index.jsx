import styled from "styled-components";
import Banner from "../../componets/Banner";
import Nav from "../../componets/Nav";
import Row from "../../componets/Row";
import requests from "../../api/requests";
const MainPage = () => {
  return (
    <Container>
      <Banner />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comdedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </Container>
  );
};
const Container = styled.main`
  position: relative;
  display: block;
  top: 70px;
  padding: 0 calc() (3.5w + 5px);
`;

export default MainPage;
