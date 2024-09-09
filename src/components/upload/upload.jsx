import { useState, useRef } from "react";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = () => {
  const productosRef = collection(db, "productos");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [genero, setGenero] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null); 
  const [imagenUrl1, setImagenUrl1] = useState(null); 
  const [imagenUrl2, setImagenUrl2] = useState(null); 
  const inputRef = useRef(null); 
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [descripcion, setDescripcion] = useState("");
  const [slug, setSlug] = useState("");

  const handleNombreChange = (event) => {
    const nombreValue = event.target.value;
    setNombre(nombreValue);
    setSlug(generateSlug(nombreValue)); // Genera el slug cuando cambia el nombre
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  const handleImagenChange = (event) => {
    if (event.target.files[0]) {
      setImagen(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]); 
      setImagenUrl(url); 
    }
  };

  const handleImagen1Change = (event) => {
    if (event.target.files[0]) {
      setImagen1(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]); 
      setImagenUrl1(url); 
    }
  };

  const handleImagen2Change = (event) => {
    if (event.target.files[0]) {
      setImagen2(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]);
      setImagenUrl2(url);
    }
  };

  const handleFotoClick = () => {
    inputRef.current.click();
  };
  
  const handleFoto1Click = () => {
    inputRef1.current.click();
  };

  const handleFoto2Click = () => {
    inputRef2.current.click();
  };

  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imagen) {
      alert("Debes seleccionar una imagen");
      return;
    }

    const storageRef = ref(storage, `imagenes/${imagen.name}`);
    await uploadBytes(storageRef, imagen);

    if (!imagen1) {
      alert("Debes seleccionar una imagen");
      return;
    }

    const storageRef1 = ref(storage, `imagenes/${imagen1.name}`);
    await uploadBytes(storageRef1, imagen1);

    if (!imagen2) {
      alert("Debes seleccionar una imagen");
      return;
    }

    const storageRef2 = ref(storage, `imagenes/${imagen2.name}`);
    await uploadBytes(storageRef2, imagen2);

    const img = await getDownloadURL(storageRef);
    const img1 = await getDownloadURL(storageRef1);
    const img2 = await getDownloadURL(storageRef2);

    await addDoc(productosRef, {
      nombre: nombre,
      precio: precio,
      genero: genero,
      img: img,
      img1: img1,
      img2: img2,
      descripcion: descripcion,
      slug: slug // Incluye el slug en el documento
    });

    setNombre("");
    setPrecio("");
    setImagen(null);
    setImagen1(null);
    setImagen2(null);
    setImagenUrl(null);
    setImagenUrl1(null); 
    setImagenUrl2(null); 
    setDescripcion("");
    setSlug(""); // Limpiar el slug

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <main className="contenedor-agregar">
      <button
        className="foto"
        style={{ backgroundImage: `url(${imagenUrl})` }}
        onClick={handleFotoClick}
      >
        {imagenUrl ? null : <i className="bi bi-folder-plus"><p>Portada</p></i>}
        <input
          ref={inputRef}
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImagenChange}
          style={{ display: "none" }}
        />
      </button>
      <button
        className="foto"
        style={{ backgroundImage: `url(${imagenUrl1})` }}
        onClick={handleFoto1Click}
      >
        {imagenUrl1 ? null : <i className="bi bi-folder-plus"><p>2da foto</p></i>}
        <input
          ref={inputRef1}
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImagen1Change}
          style={{ display: "none" }}
        />
      </button>
      <button
        className="foto"
        style={{ backgroundImage: `url(${imagenUrl2})` }}
        onClick={handleFoto2Click}
      >
        {imagenUrl2 ? null : <i className="bi bi-folder-plus"><p>3ra foto</p></i>}
        <input
          ref={inputRef2}
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImagen2Change}
          style={{ display: "none" }}
        />
      </button>
      <article className="inputs">
        <label htmlFor="nombre">Nombre</label>
        <input
          name="nombre"
          type="text"
          value={nombre}
          onChange={handleNombreChange}
        />
        <label htmlFor="precio">Precio</label>
        <input
          name="precio"
          type="number"
          value={precio}
          onChange={handlePrecioChange}
        />
        <label htmlFor="genero">Genero</label>
        <select name="genero" value={genero} onChange={handleGeneroChange}>
          <option value="hombre">Hombre</option>
          <option value="dama">Dama</option>
        </select>
        <label>Descripción</label>
        <textarea value={descripcion} onChange={handleChangeDescripcion} />
        <button onClick={handleSubmit}>Agregar</button>
      </article>
    </main>
  );
};

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default Upload;
