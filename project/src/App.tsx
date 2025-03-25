import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Contact from './pages/Contact';
import CodingChallenge from './pages/CodingChallenge';
import Leaderboard from './pages/Leaderboard';
import StudySession from './pages/StudySession';
import ProjectMilestone from './pages/ProjectMilestone';
import Premium from './pages/Premium';
import PeerReview from './pages/PeerReview';
import CourseDetails from './pages/CourseDetails';
import CategoryPage from './pages/CategoryPage';
import EnrollmentPage from './pages/EnrollmentPage';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/challenge/coding" element={<CodingChallenge />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/study-session" element={<StudySession />} />
        <Route path="/project-milestone" element={<ProjectMilestone />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/peer-review" element={<PeerReview />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/course/:id/enroll" element={<EnrollmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;