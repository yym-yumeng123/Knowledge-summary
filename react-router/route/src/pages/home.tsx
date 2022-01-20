import { Link, Outlet } from "react-router-dom"
const Home = () => {
  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to='/login'>Login</Link>
      </nav>

      <h2>子路由</h2>
      <Link to='/about'>About</Link>
      <Link to='/other'>Other</Link>

      <Outlet />
    </div>
  )
}

export default Home
