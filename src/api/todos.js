import axios from "axios";

export default {
  getTodos() {
    return axios.get("https://jsonplaceholder.typicode.com/users/1/todos");
  }
};
