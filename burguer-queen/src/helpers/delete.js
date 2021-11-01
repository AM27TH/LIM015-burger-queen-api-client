import { helpHttp } from "./helpHttp";

const url = 'https://api-burguerqueen-am27th.herokuapp.com';

export const deleteDataById = async (path, id) => {
  try {
    const userAuth = JSON.parse(sessionStorage.getItem("user"));
    let options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${userAuth.token}`,
      },
    };
    const response = await helpHttp().del(`${url}/${path}/${id}`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}
