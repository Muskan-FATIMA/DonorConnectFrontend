import "./App.css";
import "./ResponsiveApp.css";
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Layout from "./Layout"
import LandingPage from "./pages/LandingPage";
import EducationalResourcesPage from "./pages/EducationalResourcesPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfileFormPage from "./pages/ProfileFormPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyActivityPage from "./pages/MyActivityPage";
import MyRequestPage from "./pages/MyRequestPage";
import FeedbackPage from "./pages/FeedbackPage";
import ContactPage from "./pages/ContactPage";
import AddRequestPage from "./pages/AddRequestPage";
import ViewRequestPage from "./pages/ViewRequestPage";
import RequestAcceptedPage from "./pages/RequestAcceptedPage";
import ShowDonorDetailPage from "./pages/ShowDonorDetailPage";

export default function App() {

  const { user } = useContext(AuthContext) || {};

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="educational-resources" element={<EducationalResourcesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="register" element={!user ? <RegisterPage /> : <LandingPage />} />
          <Route path="login" element={!user ? <LoginPage /> : <LandingPage />} />
          <Route path="profile-form" element={!user ? <LoginPage /> : <ProfileFormPage />} />
          <Route path="my-profile" element={!user ? <LoginPage /> : <MyProfilePage />} />
          <Route path="my-activity" element={!user ? <LoginPage /> : <MyActivityPage />} />
          <Route path="my-request" element={!user ? <LoginPage /> : <MyRequestPage />} />
          <Route path="feedback" element={!user ? <LoginPage /> : <FeedbackPage />} />
          <Route path="add-request" element={!user ? <LoginPage /> : <AddRequestPage />} />
          <Route path="view-request" element={!user ? <LoginPage /> : <ViewRequestPage />} />
          <Route path="request-accepted" element={!user ? <LoginPage /> : <RequestAcceptedPage />} />
          <Route path="show-donor-detail" element={!user ? <LoginPage /> : <ShowDonorDetailPage />} />
        </Route>
      </Routes>
    </>
  )
}