
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import { Toaster } from "sonner";
import LandingPage from '@/components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/energielabel-:location" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
