import Navbar from '../../components/Navbar';
import './index.scss';

const Home = () => (
  <div className="home">
    <Navbar />
    <div className="image">
      <h2>Find a job</h2>
      <span>or</span>
      <h2>Hire a new talent</h2>
    </div>
  </div>
);

export default Home;