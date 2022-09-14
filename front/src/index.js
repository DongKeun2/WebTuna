import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import MainPage from "./pages/common/MainPage";
import SignupPage from "./pages/accounts/SignupPage";
import LoginPage from "./pages/accounts/LoginPage";
import RecommendPage from "./pages/common/RecommendPage";
import WebtoonPage from "./pages/common/WebtoonPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="WebtoonList" element={<WebtoonPage />} />
          <Route path="" element={<MainPage />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
