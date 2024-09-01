import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <article>
        <Link to="/upload">
          <i class="bi bi-cloud-arrow-up"></i>
          <h2>Agregar productos</h2>
        </Link>
      </article>
      <article>
        <Link to="/files">
          <i class="bi bi-journal-richtext"></i>
          <h2>Modificar productos</h2>
        </Link>
      </article>
    </main>
  );
};

export default Home;
