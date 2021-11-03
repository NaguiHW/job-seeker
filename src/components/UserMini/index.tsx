import RoomIcon from '@mui/icons-material/Room';
import './index.scss';
import profile from '../../assets/images/user.webp';
import { Link } from 'react-router-dom';

const UserMini = (
  {
    name,
    picture,
    locationName,
    professionalHeadline,
    username,
  } : {
    name: string | undefined,
    picture: string | undefined,
    locationName: string | undefined,
    professionalHeadline: string | undefined,
    username?: string | undefined,
  }
) => (
  <div className="user-mini">
    <div className="image-container">
      <img src={picture ? picture : profile} alt={name} />
    </div>
    <div className="name">
      <h2>{name}</h2>
    </div>
    <div className="location">
      <h3>{locationName ? locationName : '-'}</h3>
      <RoomIcon />
    </div>
    <div className="headline">
      <p>{professionalHeadline}</p>
    </div>
    {username && <Link to={`/user/${username}`}><button type="button">More info</button></Link>}
  </div>
);

export default UserMini;
