import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const MyJournal = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo, nav])

  const logoutHandle = async() => {
    dispatch(logout());
    nav("/");
  }

  
  return (
    <div>
      <button onClick={() => logoutHandle()}>logout for now</button>
    </div>
  )
}

export default MyJournal