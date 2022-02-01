import { useData } from '../context/DataContext';
import Loading from '../components/Loading';

const Home = () => {
  const { loading, globalData, continentsData } = useData();
  console.log(loading);
  if (loading) {
    return  <Loading />;
  }
  return (
    <div>
      
    </div>
  );
};

export default Home;
