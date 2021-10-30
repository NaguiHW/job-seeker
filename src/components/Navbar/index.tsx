import { Link } from 'react-router-dom';
import './index.scss';

const Navbar = () => (
  <nav>
    <div>
      <h1><Link to="/">Job Seeker</Link></h1>
      <ul>
        <li><Link to="/users">Users</Link></li>
        <li><a href="/">Jobs</a></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
