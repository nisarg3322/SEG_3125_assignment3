
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import Contact from './pages/Contact';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CardGame" element={<Game />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};
