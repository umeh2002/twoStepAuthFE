import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { otpUser } from "../api/auth";
import Swal from "sweetalert2";



const Otp = () => {
  const { token } = useParams();
  const navigate= useNavigate()
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (token) {
      otpUser(token);
    }
  }, []);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-slate-600">
      <div className="w-[300px] h-[300px] shadow-md rounded-md bg-white flex items-center justify-center flex-col p-3">
        <OtpInput
          inputStyle={{
            border: "1px solid",
            width: "50px",
            height: "45px",
            outline: "none",
            borderRadius: "3px",
            fontSize: "18px",
            margin: "4px",
          }}
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
      
        />
      
        <button className="w-full h-[40px] hover:cursor-pointer transition-all duration-300 bg-slate-500 text-white rounded-md mb-[15px] mt-[20px] text-[17px]" onClick={()=>{
           otpUser(token).then((res: any) => {
            console.log(res)
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Created Successfully",
                text: "A mail has been sent to you, check your email",
                timerProgressBar: true,
                timer: 9000,
              });
              navigate("/congrats")
            } else {
              Swal.fire({
                icon: "error",
                title: "not created",
                timerProgressBar: true,
                timer: 9000,
              });
            //   navigate("/first-verify")
            }
          });
        }}>
          enter
        </button>
      </div>
    </div>
  );
};

export default Otp;
