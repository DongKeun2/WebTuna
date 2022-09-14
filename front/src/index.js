import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import MainPage from "./pages/common/MainPage";
import SignupPage from "./pages/accounts/SignupPage";
import LoginPage from "./pages/accounts/LoginPage";
import ToonToonPage from "./pages/common/ToonToonPage";
import WebtoonPage from "./pages/common/WebtoonPage";
import QuizPage from "./pages/common/QuizPage";
import RankingPage from "./pages/RankingPage";
import ProfilePage from "./pages/accounts/ProfilePage";
import NotFoundPage from "./pages/common/NotFoundPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="webtoonList" element={<WebtoonPage />} />
          <Route path="toontoon" element={<ToonToonPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="" element={<MainPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
