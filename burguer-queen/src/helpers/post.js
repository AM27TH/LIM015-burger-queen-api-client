import { helpHttp } from "./helpHttp";

const url = 'https://api-burguerqueen-am27th.herokuapp.com';

export const signIn = async (data) => {
  try {
    let options = {
      headers: { "content-type": "application/json" },
      body: data,
    };
    const response = await helpHttp().post(`${url}/auth`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}

export const postData = async (path, data) => {
  try {
    const userAuth = JSON.parse(sessionStorage.getItem("user"));
    let options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${userAuth.token}`,
      },
      body: data,
    };
    const response = await helpHttp().post(`${url}/${path}`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}