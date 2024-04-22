import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';

import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import HeroSection from './HeroSection';
import FeaturesSection from './Features';
import Footer from './Footer';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
// import EmployeeList from './EmployeeList';
// import AddEmployeeForm from './AddEmployeeForm';
// import EmployeeDetails from './EmployeeDetails';
// import EditEmployeeForm from './EditEmployeeForm';
// import DeleteEmployee from './DeleteEmployee';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="containerStyle">
        <Header onMenuButtonClick={handleMenuButtonClick} />
        <Navbar />
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<AddEmployeeForm />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/employees/:id/edit" element={<EditEmployeeForm />} />
            <Route path="/employees/:id/delete" element={<DeleteEmployee />} />
            Add more routes for departments, managers, projects, etc. */}
          </Routes>
        </main>
        <FeaturesSection />
        <Footer />
      </div>
    </Router>
  );
};

export default HomePage;
