import { helpHttp } from "./helpHttp";

const url = 'https://api-burguerqueen-am27th.herokuapp.com';

export const getUserById = async (email, token) => {
  try {
    let options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    const response = await helpHttp().get(`${url}/users/${email}`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}

export const getDataById = async (path, id) => {
  try {
    const userAuth = JSON.parse(sessionStorage.getItem("user"));
    let options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${userAuth.token}`,
      },
    };
    const response = await helpHttp().get(`${url}/${path}/${id}`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}

export const getData = async (path) => {
  try {
    const userAuth = JSON.parse(sessionStorage.getItem("user"));
    let options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${userAuth.token}`,
      },
    };
    const response = await helpHttp().get(`${url}/${path}`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}