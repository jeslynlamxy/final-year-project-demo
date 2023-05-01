import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import React, { useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";

function App() {
  
  const connectWallet = async () => {
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
      fetchGreetings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGreetings = async () => {
    let contractAddress = "YOUR_CONTRACT_ADDRESS";
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      provider
    );
    const greeting = await contract.greet();
    console.log(greeting);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const { loader } = useSelector(state => state.loaderReducer)
  
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
