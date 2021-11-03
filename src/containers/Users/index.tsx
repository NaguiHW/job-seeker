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
  name: string;
  picture: string;
  locationName: string;
  professionalHeadline: string;
  username: string;
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
  const [users, setUsers] = useState<Users[]>([{
    name: '',
    picture: '',
    locationName: '',
    professionalHeadline: '',
    username: '',
  }]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { offset }: { offset: string } = useParams();

  const getUsers = () => {
    setLoading(true);
    console.log(offset);
    axios
      .post(`/users/${offset !== undefined ? `?${offset}` : ''}`)
      .then(resp => {
        setUsers(resp.data.users);
        setNext(resp.data.next);
        setPrevious(resp.data.previous);
        setTotalPages(resp.data.totalPages);
        setCurrentPage(resp.data.currentPage);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, [offset])

  return (
    loading
      ? <Lottie options={defaultOptions} height={400} width={400} />
      : (
        <>
          <div className="next-prev">
            {previous && <Link to={`/users/previous=${previous}`}><NavigateBeforeIcon className="prev" /></Link>}
            <p> {currentPage} of {Math.floor(totalPages)} pages</p>
            {next && <Link to={`/users/next=${next}`}><NavigateNextIcon className="next" /></Link>}
          </div>
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
          <div className="next-prev last">
            {previous && <Link to={`/users/previous=${previous}`}><NavigateBeforeIcon className="prev" /></Link>}
            <p> {currentPage} of {totalPages} pages</p>
            {next && <Link to={`/users/next=${next}`}><NavigateNextIcon className="next" /></Link>}
          </div>
        </>
      )
  )
};

export default Users;
