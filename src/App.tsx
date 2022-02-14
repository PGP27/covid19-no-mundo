import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Header from './components/Header/index';
import Footer from './components/Footer';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

const App = () => (
  <DataProvider>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" />
      <Route path="/:country" element={<CountryDetails />} />
      <Route path="/advancedSearch" />
    </Routes>
    <Footer />
  </DataProvider>
);

export default App;
