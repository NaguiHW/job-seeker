import RoomIcon from '@mui/icons-material/Room';
import './index.scss';
import profile from '../../assets/images/user.webp';

const UserMini = (
  {
    name,
    picture,
    locationName,
    professionalHeadline,
    username
  } : {
    name: string | undefined,
    picture: string | undefined,
    locationName: string | undefined,
    professionalHeadline: string | undefined,
    username: string | undefined,
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
    <button type="button">More info</button>
  </div>
);

export default UserMini;
