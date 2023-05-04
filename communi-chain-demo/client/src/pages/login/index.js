import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";
import UserManager from "../../artifacts/contracts/UserManager.sol/UserManager.json";
import { ethers } from "ethers";

const utils = ethers.utils;

function Login() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const launchHigherChecks = async (email, password) => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      higherChecks(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const higherChecks = async (email, password) => {
    let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      UserManager.abi,
      signer
    );
    const checkLoginPasswordTx = await contract.getUserPassword(utils.formatBytes32String(email));
    console.log("Records: {", checkLoginPasswordTx, "} Input: {", password, "}");
    // alert("View Console");
  };

  const login = async () => {
    launchHigherChecks(user.email, user.password);
    try {
      dispatch(ShowLoader());
      const response = await LoginUser(user);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96">
        <div className="flex gap-2">
          <i className="ri-shield-line text-2xl text-primary"></i>
          <h1 className="text-2xl uppercase font-semibold text-primary">
            Communi-Chain
            <br></br>
            Log In
          </h1>
        </div>
        <hr />

        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          className={
            user.email && user.password ? "contained-btn" : "disabled-btn"
          }
          onClick={login}
        >
          LOGIN
        </button>

        <Link to="/register" className="underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
