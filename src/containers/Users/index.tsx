import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import axios from 'axios';
import animationData from '../../assets/lotties/load.json';
import UserMini from "../../components/UserMini";
import './index.scss';

interface Users {
  name?: string;
  picture?: string;
  locationName?: string;
  professionalHeadline?: string;
  username?: string;
}

const Users = () => {
  const [users, setUsers] = useState<[Users]>([{}]);
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  useEffect(() => {
    axios
      .post('https://us-central1-job-seeker-3fe44.cloudfunctions.net/users/')
      .then(resp => {
        setUsers(resp.data.results);
        setLoading(false);
      }).catch(err => {
        console.error(err);
      });
  }, [])

  return (
    loading
      ? <Lottie options={defaultOptions} height={400} width={400} />
      : (
        <div className="users">
          {
            users.map(user => (
              <UserMini
                name={user.name}
                picture={user.picture}
                locationName={user.locationName}
                professionalHeadline={user.professionalHeadline}
                username={user.username}
              />
            ))
          }
        </div>
      )
  )
};

export default Users;
