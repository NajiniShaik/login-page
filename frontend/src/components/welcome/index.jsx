import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"

function Welcome() {

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMessage(data.message);
    };

    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  if (!token) {
    return <p>Please login first.</p>;
  }

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome {username} 🎉</h1>
        <p>{message}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Welcome;