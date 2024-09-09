import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to={"/"}>
        <div className="logo">
          <h2>LUCÍ A LA MODA</h2>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <ul>
        <div className="border">
          <li>
            <Link to={"/"}>Inicio</Link>
          </li>
          <li>
            <Link to={"/upload"}>Agregar productos</Link>
          </li>
          <li>
            <Link to={"/files"}>Modificar productos</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
