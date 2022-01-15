import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <main>
        <h2>登录页</h2>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
};

export default Login;
