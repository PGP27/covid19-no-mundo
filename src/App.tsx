import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/index';
import Footer from './components/Footer';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" />
      <Route path="/about" />
      <Route path="/:country" />
      <Route path="/advancedSearch" />
    </Routes>
    <Footer />
  </>
);

export default App;
