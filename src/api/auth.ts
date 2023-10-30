import axios from "axios";

const url: string = "https://twostepauth.onrender.com/api";

export const createUser = async (data: any) => {
  try {
    return await axios.post(`${url}/create-user`, data).then((res: any) => {
      return res.data.data;
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const signInUser = async (data: any) => {
  try {
    return await axios.post(`${url}/sign-in`, data).then((res: any) => {
      return res.data.data;
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const verifyUser = async (token: string) => {
    try {
      return await axios.get(`${url}/${token}/verify-account`, ).then((res: any) => {
        return res.data.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  export const otpUser = async (token: any) => {
    try {
      return await axios.get(`${url}/${token}/first-verify`, ).then((res: any) => {
        return res.data.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  };