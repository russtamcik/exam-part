import { useNavigate } from "react-router-dom";
import { TOKEN } from "../constants";
import Cookies from "js-cookie";

const LogOut = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove(TOKEN);
    navigate("/login");
  };

  return <button onClick={logout}>Log Out</button>;
};

export default LogOut;
