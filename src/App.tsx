import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import GlobalStyle from "./GlobalStyle";
import { Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import { dataLoading, setConfiguration } from "./redux/configuration/config.action";
import { useDispatch, useSelector } from "react-redux";
import { getConfiguration } from "./services/configuration";
import { RootState } from "./redux/types";
import Typography from "./components/Typography";


const Main = lazy(() => import("./pages/main"));
const Product = lazy(() => import("./pages/product"));

function App() {
  const dispatch = useDispatch()
  const {isLoading, error }= useSelector((state: RootState) => state.configuration);
  useEffect(() => {
     dataLoading()
     getConfiguration(setConfiguration, dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(isLoading) {
    return <Typography>Loading configuration, please wait...</Typography>
  }

  if(error) {
    return <Typography>OOPS.... Unable to load configuration, please check your network</Typography>
  }
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Product" element={<Product />} />
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

export default App;
