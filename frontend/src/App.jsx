import "./App.css";
import "./ResponsiveApp.css";
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Layout from "./Layout"
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfileFormPage from "./pages/ProfileFormPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyRequestPage from "./pages/MyRequestPage";
import FeedbackPage from "./pages/FeedbackPage";
import ContactPage from "./pages/ContactPage";
import AddRequestPage from "./pages/AddRequestPage";
import ViewRequestPage from "./pages/ViewRequestPage";
import BloodGuidePage from "./pages/BloodGuidePage";
import OurServices from "./components/our-services-page-components/OurServices";

export default function App() {

  const { user } = useContext(AuthContext) || {};

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="blood-guide" element={<BloodGuidePage />} />
          <Route path="our-services" element={<OurServices />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="register" element={!user ? <RegisterPage /> : <LandingPage />} />
          <Route path="login" element={!user ? <LoginPage /> : <LandingPage />} />
          <Route path="profile-form" element={!user ? <LoginPage /> : <ProfileFormPage />} />
          <Route path="my-profile" element={!user ? <LoginPage /> : <MyProfilePage />} />
          <Route path="my-request" element={!user ? <LoginPage /> : <MyRequestPage />} />
          <Route path="feedback" element={!user ? <LoginPage /> : <FeedbackPage />} />
          <Route path="add-request" element={!user ? <LoginPage /> : <AddRequestPage />} />
          <Route path="view-request" element={!user ? <LoginPage /> : <ViewRequestPage />} />
        </Route>
      </Routes>
    </>
  )
}