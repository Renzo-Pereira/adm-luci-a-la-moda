import { useState, useRef } from "react";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = () => {
  const productosRef = collection(db, "productos");
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null); // Agregar estado para la URL de la imagen
  const inputRef = useRef(null); // Referencia al input de tipo file
  const [descripcion, setDescripcion] = useState('');
  const [colores, setColores] = useState('');
  const [tallesSeleccionados, setTallesSeleccionados] = useState([]);

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleImagenChange = (event) => {
    if (event.target.files[0]) {
      setImagen(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]); // Crear una URL para la imagen seleccionada
      setImagenUrl(url); // Establecer la URL de la imagen en el estado
    }
  };

  const handleFotoClick = () => {
    // Simular clic en el input de tipo file al hacer clic en el botón de foto
    inputRef.current.click();
  };

  const handleChangeTalle = (event) => {
    const talle = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Agrega el talle seleccionado
      setTallesSeleccionados([...tallesSeleccionados, talle]);
    } else {
      // Elimina el talle no seleccionado
      const updatedTalles = tallesSeleccionados.filter(item => item !== talle);
      setTallesSeleccionados(updatedTalles);
    }
  };

  const handleChangeColores = (event) => {
    setColores(event.target.value);
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

    // Subir imagen a Firebase Storage
    const storageRef = ref(storage, `imagenes/${imagen.name}`);
    await uploadBytes(storageRef, imagen);

    // Obtener la URL de la imagen subida
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(productosRef, {
      titulo: titulo,
      precio: precio,
      categoria: categoria,
      imagenUrl: imageUrl,
      talles: tallesSeleccionados,
      colores: colores,
      descripcion: descripcion,
    });
    // Limpiar los campos después de agregar el producto
    setTitulo("");
    setPrecio("");
    setImagen(null);
    setImagenUrl(null); // Limpiar la URL de la imagen
    setTallesSeleccionados([]);
    setColores("");
    setDescripcion("");

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div className="contenedor-agregar">
      <button
        className="foto"
        style={{ backgroundImage: `url(${imagenUrl})` }}
        onClick={handleFotoClick}
      >
        {imagenUrl ? null : <i className="bi bi-folder-plus"></i>}
        <input
          ref={inputRef}
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImagenChange}
          style={{ display: "none" }} // Ocultar el input file
        />
      </button>
      <div className="inputs">
        <label htmlFor="titulo">Titulo</label>
        <input
          name="titulo"
          type="text"
          value={titulo}
          onChange={handleTituloChange}
        />
        <label htmlFor="precio">Precio</label>
        <input
          name="precio"
          type="number"
          value={precio}
          onChange={handlePrecioChange}
        />
        <label htmlFor="categoria">Categoria</label>
        <select
          name="categoria"
          value={categoria}
          onChange={handleCategoriaChange}
        >
          <option value="vestido">Vestido</option>
          <option value="short">Short</option>
          <option value="remera">Remera</option>
          <option value="musculosa">Musculosa</option>
        </select>
        <h3 className="contenedor-agregar-h3">Talles</h3>
        <div className="contenedor-agregar-talles">
          <label htmlFor="XXXS">XXXS</label>
          <input onChange={handleChangeTalle} name="XXXS" type="checkbox" />
          <label htmlFor="XXS">XXS</label>
          <input onChange={handleChangeTalle} name="XXS" type="checkbox" />
          <label htmlFor="XS">XS</label>
          <input onChange={handleChangeTalle} name="XS" type="checkbox" />
          <label htmlFor="S">S</label>
          <input onChange={handleChangeTalle} name="S" type="checkbox" />
          <label htmlFor="M">M</label>
          <input onChange={handleChangeTalle} name="M" type="checkbox" />
          <label htmlFor="L">L</label>
          <input onChange={handleChangeTalle} name="L" type="checkbox" />
          <label htmlFor="XL">XL</label>
          <input onChange={handleChangeTalle} name="XL" type="checkbox" />
          <label htmlFor="XXL">XXL</label>
          <input onChange={handleChangeTalle} name="XXL" type="checkbox" />
          <label htmlFor="XXXL">XXXL</label>
          <input onChange={handleChangeTalle} name="XXXL" type="checkbox" />
          <label htmlFor="XXXXL">XXXXL</label>
          <input onChange={handleChangeTalle} name="XXXXL" type="checkbox" />
          <label htmlFor="XXXXXL">XXXXXL</label>
          <input onChange={handleChangeTalle} name="XXXXXL" type="checkbox" />
          <label htmlFor="XXXXXXL">XXXXXXL</label>
          <input onChange={handleChangeTalle} name="XXXXXXL" type="checkbox" />
          <label htmlFor="XXXXXXXL">XXXXXXXL</label>
          <input onChange={handleChangeTalle} name="XXXXXXXL" type="checkbox" />
        </div>
        <label>Colores</label>
        <textarea value={colores} onChange={handleChangeColores}/>
        <label>Descripción</label>
        <textarea value={descripcion} onChange={handleChangeDescripcion}/>
        <button onClick={handleSubmit}>Agregar</button>
      </div>
    </div>
  );
};

export default Upload;
