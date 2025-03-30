
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Admin from '@/pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
