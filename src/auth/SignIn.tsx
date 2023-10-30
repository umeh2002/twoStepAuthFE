
import { BiLogoGmail } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import {  signInUser, verifyUser } from "../api/auth";
import { useEffect } from "react";
import { userState } from "../global/global";
import { useRecoilState, useRecoilValue } from "recoil";

const SignIn = () => {

    const navigate = useNavigate();
    const {token} = useParams()

    const [state, setState] = useRecoilState(userState);
    const value = useRecoilValue(userState);
    const schema = yup.object({
      email: yup.string().lowercase().email().required(),
      password: yup.string().required(),
    });
  
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });
  
    const onSubmit = handleSubmit(async (data: any) => {
      const {  password, email,  } = data;
      signInUser({  password, email,  }).then((res: any) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "welcome back",
            text: "it is great to have you here!!",
            timerProgressBar: true,
            timer: 9000,
          });
          setState(res)
          navigate("/homepage")
        } else {
          Swal.fire({
            icon: "error",
            title: "not created",
            timerProgressBar: true,
            timer: 9000,
          });
          navigate("/login")
        }
      });
    });
    useEffect(() => {
        if (token) {
            verifyUser(token);
        }
      }, [])
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-slate-600">
    <form
      className="w-[400px] min-h-[200px] shadow-md bg-white text-black rounded-md p-3"
      onSubmit={onSubmit}
    >
      <div className="mb-3 text-[20px] font-semibold">Sign In</div>

      <div className="flex items-center justify-center mb-[5px]">
        <BiLogoGmail className="text-[30px] mr-[10px] hover:cursor-pointer duration-500 transition-all" />

        <input
          type="email"
          placeholder="enter your email address"
          className="w-[80%] h-[40px] outline-none border pl-[10px] placeholder:text-[14px] rounded-md"
          {...register("email")}
        />
      </div>
      {errors.email && (
        <span className="text-[10px] text-red-500 flex justify-end mr-[20px] mb-[15px]">
          please fill here
        </span>
      )}

      <div className="flex items-center justify-center mb-[5px]">
        <MdPassword className="text-[30px] mr-[10px] hover:cursor-pointer duration-500 transition-all" />

        <input
          type="password"
          placeholder="enter your password"
          className="w-[80%] h-[40px] outline-none border pl-[10px] placeholder:text-[14px] rounded-md"
          {...register("password")}
        />
      </div>
      {errors.password && (
        <span className="text-[10px] text-red-500 flex justify-end mr-[20px] mb-[15px]">
          please fill here
        </span>
      )}
     
      <button
        className="w-full h-[40px] hover:cursor-pointer transition-all duration-300 bg-slate-500 text-white rounded-md mb-[15px]"
        type="submit"
      >
        sign in
      </button>
      <div className="text-[13px]">
        Don't have an account?{" "}
        <Link to="/">
          <span className="text-[20px] font-semibold hover:cursor-pointer transition-all duration-500">
            sign up
          </span>
        </Link>
      </div>
    </form>
  </div>
  )
}

export default SignIn