import { Suspense, lazy, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Layout from "./Layout";
import "./App.css";
import "./ResponsiveApp.css";

const LandingPage = lazy(() => import('./pages/LandingPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfileFormPage = lazy(() => import('./pages/ProfileFormPage'));
const MyProfilePage = lazy(() => import('./pages/MyProfilePage'));
const MyRequestPage = lazy(() => import('./pages/MyRequestPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AddRequestPage = lazy(() => import('./pages/AddRequestPage'));
const ViewRequestPage = lazy(() => import('./pages/ViewRequestPage'));
const BloodGuidePage = lazy(() => import('./pages/BloodGuidePage'));
const OurServicesPage = lazy(() => import('./pages/OurServicesPage'));
const RequestAddedPage = lazy(() => import('./pages/RequestAddedPage'));

export default function App() {
  const { user } = useContext(AuthContext) || {};

  return (
    <Suspense fallback={<div style={{ textAlign: "center", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="blood-guide" element={<BloodGuidePage />} />
          <Route path="our-services" element={<OurServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="register" element={!user ? <RegisterPage /> : <LandingPage />} />
          <Route path="login" element={!user ? <LoginPage /> : <LandingPage />} />
          <Route path="profile-form" element={!user ? <LoginPage /> : <ProfileFormPage />} />
          <Route path="my-profile" element={!user ? <LoginPage /> : <MyProfilePage />} />
          <Route path="my-request" element={!user ? <LoginPage /> : <MyRequestPage />} />
          <Route path="feedback" element={!user ? <LoginPage /> : <FeedbackPage />} />
          <Route path="add-request" element={!user ? <LoginPage /> : <AddRequestPage />} />
          <Route path="request-added" element={!user ? <LoginPage /> : <RequestAddedPage />} />
          <Route path="view-request" element={!user ? <LoginPage /> : <ViewRequestPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
