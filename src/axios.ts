import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://us-central1-job-seeker-3fe44.cloudfunctions.net' : 'http://localhost:5001/job-seeker-3fe44/us-central1'
});

export default instance;
