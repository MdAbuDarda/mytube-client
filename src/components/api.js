import axios from 'axios';
const API_URL = 'http://localhost/mytube/';

const getVideos = axios.get(API_URL);

export default getVideos;