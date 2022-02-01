import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/index';
import Footer from './components/Footer';
import Home from './pages/Home';
import { DataProvider } from './context/DataContext';

const App = () => (
  <DataProvider>  
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" />
      <Route path="/:country" />
      <Route path="/advancedSearch" />
    </Routes>
    <Footer />
  </DataProvider>
);

export default App;
