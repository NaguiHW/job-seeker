import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import axios from '../../axios';
import animationData from '../../assets/lotties/load.json';
import { useParams } from "react-router-dom";
import UserMini from "../../components/UserMini";
import he from 'he';
import Section from "../../components/Section";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
import './index.scss';
import SectionList from "../../components/SectionList";

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
  const [strengths, setStrengths] = useState<{master: [], expert: [], proficient: []}>({
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
      .get(`/users/${username}`)
      .then(resp => {
        setUser(resp.data.person);
        setStrengths(resp.data.strengths);
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
            />
            <SectionList
              title="Strengths"
              icon={<InfoIcon />}
              list={strengths}
            />
          </div>
        </div>
      )
  )
};

export default User;
