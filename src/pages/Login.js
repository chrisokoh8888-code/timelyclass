import { useState } from "react";
import { login, signup } from "../services/auth";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password);
        alert("Logged in");
      } else {
        await signup(email, password);
        alert("Account created");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">{isLogin ? "Login" : "Signup"}</h2>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border" />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} className="w-full mb-4 p-2 border" />

        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white p-2">
          {isLogin ? "Login" : "Signup"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="text-sm mt-3 cursor-pointer">
          Switch to {isLogin ? "Signup" : "Login"}
        </p>
      </div>
    </div>
  );
  }
