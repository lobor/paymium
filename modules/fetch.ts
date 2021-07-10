import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://private-3f9656-paymiuminterviews.apiary-mock.com",
});

export default instanceAxios;
