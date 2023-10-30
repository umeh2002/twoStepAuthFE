import { PropsWithChildren } from "react";
import { user, userState } from "../global/global";
import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const value: any = useRecoilValue(userState);
  const [state, setState] = useRecoilState<any>(user);

  console.log(state);
  let myToken: any = {};
  let tokenID: string = value;

  if (tokenID) {
    myToken = jwtDecode(tokenID);
    setState(myToken.id);
  }

  return <div>{tokenID ? <>{children}</> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
