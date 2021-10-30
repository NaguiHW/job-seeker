import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import axios from 'axios';
import animationData from '../../assets/lotties/load.json';
import { useParams } from "react-router";
import UserMini from "../../components/UserMini";
import he from 'he';
import Section from "../../components/Section";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
import './index.scss';

interface User {
  name: string;
  picture: string;
  professionalHeadline: string;
  summaryOfBio: string;
  location: {
    name: string;
  };
}

const User = () => {
  const { username }: { username: string } = useParams();

  const [user, setUser] = useState<User>({
    name: '',
    picture: '',
    professionalHeadline: '',
    summaryOfBio: '',
    location: {
      name: '',
    }
  })
  const [strength, setStrength] = useState<{master: [], expert: [], proficient: []}>({
    master: [],
    expert: [],
    proficient: [],
  })
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const bio = (str: string) => {
    return str.replace(/&#?\w{2,5};/gi, (text: any) => {
      return he.decode(text);
    });
  };
  
  useEffect(() => {
    axios
      .get(`https://us-central1-job-seeker-3fe44.cloudfunctions.net/users/${username}`)
      .then(resp => {
        setUser(resp.data.person);

        const values: any = {
          master: [],
          expert: [],
          proficient: [],
        };

        resp.data.strengths.forEach((strength: { proficiency: string; }) => {
          if (strength.proficiency === 'master') {
            values.master.push(strength);
          }

          if (strength.proficiency === 'expert') {
            values.expert.push(strength);
          }

          if (strength.proficiency === 'proficient') {
            values.proficient.push(strength);
          }
        });

        setStrength(values);

        setLoading(false);
      }).catch(err => {
        console.error(err);
      });
  }, []);

  return (
    loading
      ? <Lottie options={defaultOptions} height={400} width={400} />
      : (
        <div className="user">
          <UserMini
            name={user.name}
            picture={user.picture}
            locationName={user.location.name}
            professionalHeadline={user.professionalHeadline}
          />
          <div className="info">
            <Section
              title="Biography"
              icon={<AccountBoxIcon />}
              content={bio(user.summaryOfBio ? user.summaryOfBio : '-')}
              type="info"
            />
            <Section
              title="Strengths"
              icon={<InfoIcon />}
              list={strength}
              type="list"
            />
          </div>
        </div>
      )
  )
};

export default User;
