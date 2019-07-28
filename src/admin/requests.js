import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";
axios.defaults.headers["Authorization"] = `Bearer ${token}`;

export default axios;
