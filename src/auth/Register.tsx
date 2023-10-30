import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { createUser } from "../api/auth";

const Register = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password")]),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data: any) => {
    const { name, password, email, confirm } = data;
    createUser({ name, password, email, confirm }).then((res: any) => {
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Created Successfully",
          text: "A mail has been sent to you, check your email",
          timerProgressBar: true,
          timer: 9000,
        });
        navigate("/message")
      } else {
        Swal.fire({
          icon: "error",
          title: "not created",
          timerProgressBar: true,
          timer: 9000,
        });
        navigate("/register")
      }
    });
  });
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-slate-600">
      <form
        className="w-[400px] min-h-[200px] shadow-md bg-white text-black rounded-md p-3"
        onSubmit={onSubmit}
      >
        <div className="mb-3 text-[20px] font-semibold">Register with us</div>
        <div className="flex items-center justify-center mb-[5px]">
          <AiOutlineUserAdd className="text-[30px] mr-[10px] hover:cursor-pointer duration-500 transition-all" />

          <input
            type="text"
            placeholder="enter your name"
            className="w-[80%] h-[40px] outline-none border pl-[10px] placeholder:text-[14px] rounded-md"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <span className="text-[10px] text-red-500 flex justify-end mr-[20px] mb-[5px]">
            please fill here
          </span>
        )}

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

        <div className="flex items-center justify-center mb-[5px]">
          <MdPassword className="text-[30px] mr-[10px] hover:cursor-pointer duration-500 transition-all" />

          <input
            type="password"
            placeholder="confirm your password"
            className="w-[80%] h-[40px] outline-none border pl-[10px] placeholder:text-[14px] rounded-md"
            {...register("confirm")}
          />
        </div>
        {errors.confirm && (
          <span className="text-[10px] text-red-500 flex justify-end mr-[20px] mb-[15px]">
            please fill here
          </span>
        )}
        <div className="flex items-center mb-[15px]">
          <input
            type="checkbox"
            className="hover:cursor-pointer transition-all duration-500"
          />
          <div className="ml-1 text-[13px]">
            agree to our{" "}
            <span className="font-bold underline hover:cursor-pointer duration-300 transition-all">
              Terms
            </span>{" "}
            and{" "}
            <span className="font-bold underline hover:cursor-pointer duration-300 transition-all">
              Conditions
            </span>
          </div>
        </div>
        <button
          className="w-full h-[40px] hover:cursor-pointer transition-all duration-300 bg-slate-500 text-white rounded-md mb-[15px]"
          type="submit"
        >
          register
        </button>
        <div className="text-[13px]">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[20px] font-semibold hover:cursor-pointer transition-all duration-500">
              sign in
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
