import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
};

export default Home;
