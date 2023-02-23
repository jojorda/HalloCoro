import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Home";
import { UserContext } from "./context/userContex";
import { API, setAuthToken } from "./config/api";
import DetailArticleAuth from "./pages/NavDetailArticle";
import LayoutPatient from "./pages/PrivateRootPat";
import HomePage from "./pages/HomePage";
import DetailArticle from "./components/DetailArticle";
import Profile from "./components/Profile";
import ReservationPage from "./pages/FormReservasi";
import Inbox from "./pages/Inbox";
import LayoutDoctor from "./pages/PrivateRootDoc";
import Reservation from "./pages/LoginDoc";
import DetReserv from "./pages/DetailInvo";
import AddArticle from "./pages/AddArticle";
import Article from "./components/Article";
import Notfound from "./components/NotFound";
import PrivateRoute from "./pages/PrivateRoot";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.listAs === "doctor") {
        navigate("/doctor");
      } else if (state.user.listAs === "patient") {
        navigate("/patient");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route path="/detailarticle/:id" element={<DetailArticleAuth />} />
        
        <Route path="/patient" element={<LayoutPatient />}>
          <Route index element={<HomePage />} />
          <Route path="/patient/detailarticle/:id" element={<DetailArticle />}/>
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/patient/consultation" element={<ReservationPage />} />
          <Route path="/patient/inbox" element={<Inbox />} />
        </Route>
        <Route path="/doctor" element={<LayoutDoctor />}>
          <Route index element={<Reservation />} />
          <Route path="/doctor/reservation/:id" element={<DetReserv />} />
          <Route path="/doctor/add-article" element={<AddArticle />} />
          <Route path="/doctor/list-article" element={<Article />} />
          <Route path="/doctor/detailarticle/:id" element={<DetailArticle />} />
          <Route path="/doctor/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
