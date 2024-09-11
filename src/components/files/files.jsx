import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const Files = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosRef = collection(db, "productos");

    getDocs(productosRef).then((resp) => {
      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    setProductos(productos.filter((prod) => prod.id !== id)); 
  };

  return (
    <main className="productos">
      {productos.map((prod) => (
        <ProductoRow key={prod.id} prod={prod} handleDelete={handleDelete} />
      ))}
    </main>
  );
};

const ProductoRow = ({ prod, handleDelete }) => {
  const [nombre, setNombre] = useState(prod.nombre);
  const [marca, setMarca] = useState(prod.marca);
  const [precio, setPrecio] = useState(prod.precio);
  const [genero, setGenero] = useState(prod.genero);
  const [descripcion, setDescripcion] = useState(prod.descripcion);
  const [slug, setSlug] = useState(prod.slug || generateSlug(prod.nombre));
  const [isChanged, setIsChanged] = useState(false);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNombreChange = (e) => {
    const newName = e.target.value;
    setNombre(newName);
    setSlug(generateSlug(newName));
    checkChanges(newName, marca, precio, genero, descripcion);
  };

  const handleMarcaChange = (e) => {
    setMarca(e.target.value);
    checkChanges(nombre, e.target.value, precio, genero, descripcion);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
    checkChanges(nombre, marca, e.target.value, genero, descripcion);
  };

  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
    checkChanges(nombre, marca, precio, e.target.value, descripcion);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    checkChanges(nombre, marca, precio, genero, e.target.value);
  };

  const checkChanges = (newNombre, newMarca, newPrecio, newGenero, newDescripcion) => {
    if (
      newNombre !== prod.nombre ||
      newMarca !== prod.marca ||
      newPrecio !== prod.precio ||
      newGenero !== prod.genero ||
      newDescripcion !== prod.descripcion
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleUpdate = async () => {
    const productoRef = doc(db, "productos", prod.id);
    await updateDoc(productoRef, {
      nombre,
      marca,
      precio: parseFloat(precio),
      genero,
      descripcion,
      slug,
    });
    setIsChanged(false);
  };

  return (
    <div className="productos-filas">
      <img className="productos-img" src={prod.img} alt={prod.nombre} />
      <div className="productos-text">
        <input name="nombre" type="text" value={nombre} onChange={handleNombreChange} />
        <input name="marca" type="text" value={marca} onChange={handleMarcaChange} />
        <input name="precio" type="number" value={precio} onChange={handlePrecioChange} />
        <select name="genero" value={genero} onChange={handleGeneroChange}>
          <option value="hombre">Hombre</option>
          <option value="dama">Dama</option>
        </select>
        <textarea value={descripcion} onChange={handleDescripcionChange} />
        <button onClick={handleUpdate} disabled={!isChanged}>
          Actualizar
        </button>
        <button type="button" onClick={() => handleDelete(prod.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Files;
