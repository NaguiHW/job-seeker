import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import axios from '../../axios';
import animationData from '../../assets/lotties/load.json';
import UserMini from "../../components/UserMini";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import './index.scss';

interface Users {
  users: {
    name: string;
    picture: string;
    locationName: string;
    professionalHeadline: string;
    username: string;
  }[];
  total: number;
  size: number;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Users = () => {
  const [users, setUsers] = useState<Users>({
    users: [{
      name: '',
      picture: '',
      locationName: '',
      professionalHeadline: '',
      username: '',
    }],
    total: 0,
    size: 0,
  });
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const { offset }: { offset: string } = useParams();

  const getUsers = () => {
    setLoading(true);
    axios
      .post(`/users/?size=25${offset && `&${offset}`}`)
      .then(resp => {
        setUsers(resp.data);
        setNext(resp.data.next);
        setPrevious(resp.data.previous);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getUsers();
  }, [offset])

  return (
    loading
      ? <Lottie options={defaultOptions} height={400} width={400} />
      : (
        <div className="users">
          {
            users.users.map(user => (
              <UserMini
                name={user.name}
                picture={user.picture}
                locationName={user.locationName}
                professionalHeadline={user.professionalHeadline}
                username={user.username}
              />
            ))
          }
          <div className="next-prev">
            {previous && <Link to={`/users/previous=${previous}`}><NavigateBeforeIcon /></Link>}
            <p>{users.total}</p>
            {next && <Link to={`/users/next=${next}`}><NavigateNextIcon /></Link>}
          </div>
        </div>
      )
  )
};

export default Users;
