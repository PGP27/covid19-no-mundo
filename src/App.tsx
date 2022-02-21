import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Header from './components/Header/index';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import About from './pages/About';
import CountryDetails from './pages/CountryDetails';
import AdvancedSearch from './pages/AdvancedSearch';

const App = () => (
  <DataProvider>
    <Header />
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/country/:country" element={<CountryDetails />} />
      <Route path="/advancedSearch" element={<AdvancedSearch />} />
    </Routes>
    <Footer />
  </DataProvider>
);

export default App;
