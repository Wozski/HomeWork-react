import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
const Container = styled.div``;
const Empty = styled.div`
  margin-top: -1;
  font-size: 25px;
  display: flex;
  text-align: center;
`;
const Title = styled.div`
  border: 1px solid;
  font-size: 25px;
  display: flex;
  text-align: center;
  background: #00bfff;
`;
const Box = styled.div`
  border: 1px solid;
  width: 286px;
`;

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const cors = "https://cors-anywhere.herokuapp.com/";
  const url =
    "https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json";

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`${cors}${url}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (items !== null) {
      const datas = items.XML_Head.Infos.Info;
      return (
        <Container>
          <Title>
            <Box>地區</Box>
            <Box>鄉鎮</Box>
            <Box>公司名稱</Box>
            <Box>地址</Box>
            <Box>電話</Box>
          </Title>
          {datas.map((data) => (
            <Empty>
              <Box>{data.Region}</Box>
              <Box>{data.Town}</Box>
              <Box>{data.Name}</Box>
              <Box>{data.Add}</Box>
              <Box>{data.Tel}</Box>
            </Empty>
          ))}
        </Container>
      );
    } else {
      return (
        <Container>
          <Title>
            <Box>地區</Box>
            <Box>鄉鎮</Box>
            <Box>公司名稱</Box>
            <Box>地址</Box>
            <Box>電話</Box>
          </Title>
        </Container>
      );
    }
  }
}

export default App;
