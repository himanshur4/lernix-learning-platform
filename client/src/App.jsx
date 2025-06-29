import { Route, Routes, useMatch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/student/Navbar';
import Loading from './components/student/Loading';
import "quill/dist/quill.snow.css";
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/student/Home'));
const CoursesList = lazy(() => import('./pages/student/CoursesList'));
const CourseDetails = lazy(() => import('./pages/student/CourseDetails'));
const MyEnrollments = lazy(() => import('./pages/student/MyEnrollments'));
const Player = lazy(() => import('./pages/student/Player'));
const Educator = lazy(() => import('./pages/educator/Educator'));
const AddCourse = lazy(() => import('./pages/educator/AddCourse'));
const Dashboard = lazy(() => import('./pages/educator/Dashboard'));
const MyCourses = lazy(() => import('./pages/educator/MyCourses'));
const StudentsEnrolled = lazy(() => import('./pages/educator/StudentsEnrolled'));

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="text-default min-h-screen">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Suspense fallback={<Loading path="lazy-load" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses-list" element={<CoursesList />} />
          <Route path="/courses-list/:input" element={<CoursesList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/loading/:path" element={<Loading />} />
          <Route path="/educator" element={<Educator />}>
            <Route path="/educator" element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="students-enrolled" element={<StudentsEnrolled />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
