import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";
import UserManager from "../../artifacts/contracts/UserManager.sol/UserManager.json";
import { ethers } from "ethers";
const utils = ethers.utils;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });


  const launchRegisteration = async (email, password) => {
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
      registerUser(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (email, password) => {
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
    const newUserTx = await contract.newUser(utils.formatBytes32String(email), password);
    await newUserTx.wait();
  };

  const register = async () => {
    try {
      dispatch(ShowLoader());
      const response = await RegisterUser(user);
      dispatch(HideLoader());
      if (response.success) {
        launchRegisteration(user.email, user.password);
        toast.success(response.message);
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
            Register
          </h1>
        </div>
        <hr />
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter your name"
        />
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
            user.name && user.email && user.password
              ? "contained-btn"
              : "disabled-btn"
          }
          onClick={register}
        >
          Register
        </button>

        <Link to="/login" className="underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
