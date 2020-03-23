import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const  API_URL  = global.API_SERVER;

export let url = API_URL || "http://localhost:10010";

if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}

let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const default_config = {
    baseURL: url,
    headers
  };
  
  const timeout = 2000;

  class ClientAPI {
    constructor() {
      this.client = axios.create({
        ...default_config,
        timeout,
        headers: {
          ...headers
        }
      });
    }
  
    setToken(token) {
      
      AsyncStorage.setItem('userToken',token ? token : 'faketoken');

      this.client = axios.create({
        ...default_config,
        timeout,
        headers: {
          authorization: `Bearer ${token}`,
          ...headers
        }
      });
    }
  
    removeToken() {
      this.client = axios.create({
        ...default_config,
        timeout,
        headers: {
          authorization: null,
          ...headers
        }
      });
    }
  
    addMiddleWare() {
      this.client.interceptors.response.use(
        response => response,
        async error => {
          //update the token if is expired
          if (
            error.response.status === 401 &&
            error.response.data &&
            error.response.data.name == "TokenExpired"
          ) {
            //set the new token
            const newToken = error.response.data.token;
            this.setToken(newToken);
  
            //make again the request
            error.config.headers["authorization"] = `Bearer ${newToken}`;
  
            return axios.request(error.config);
          }
  
          //try to set token when is empty
          if (error.response.status === 401 && error.response.data &&
            error.response.data.message == "jwt malformed") {
            const token = getCookie("pwgedsports-token", null)
  
            if (token) {
              this.setToken(token);
  
              error.config.headers["authorization"] = `Bearer ${token}`;
  
              return axios.request(error.config);
            }
  
          }
  
          return Promise.reject(error);
        }
      );
    }
  
    getClient() {
      this.addMiddleWare();
      return this.client;
    }
  }
  
  const clientApi = new ClientAPI();
  
  export { clientApi };