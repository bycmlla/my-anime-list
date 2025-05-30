import React, { useState } from "react";
import "./AddWorkForm.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddWorkForm = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    year: "",
    description: "",
    rating: "",
    genre: "",
    authors: "",
    cover: null,
    images: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token !== "meu-token-seguro") {
      navigate("/login");
    }
  }, []);

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleAddWork = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("year", form.year);
    formData.append("description", form.description);
    formData.append("rating", form.rating);
    formData.append("genre", form.genre);
    formData.append("authors", form.authors);

    if (form.cover) {
      formData.append("cover", form.cover);
    }

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:4000/obras", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Obra adicionada com sucesso");
      } else {
        console.error("Erro ao adicionar obra");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, cover: file }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddWork();
    setForm({
      title: "",
      category: "",
      year: "",
      description: "",
      rating: "",
      genre: "",
      authors: "",
      cover: null,
      images: [],
    });
    setImagePreviews([]);
    document.getElementById("coverInput").value = "";
    document.getElementById("imagesInput").value = "";
  };

  return (
    <form className="add-work-form" onSubmit={handleSubmit}>
      <h2>Adicionar Obra</h2>
      <input
        name="title"
        placeholder="Nome da obra"
        value={form.title}
        onChange={handleChange}
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma categoria</option>
        <option value="Anime">Anime</option>
        <option value="Filme">Filme</option>
        <option value="Série">Série</option>
      </select>

      <input
        name="year"
        placeholder="Ano"
        value={form.year}
        onChange={handleChange}
        type="number"
        min="1900"
        max={new Date().getFullYear()}
      />

      <textarea
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="rating"
        placeholder="Nota"
        value={form.rating}
        onChange={handleChange}
        type="number"
        step="0.1"
        min="0"
        max="10"
      />

      <input
        name="genre"
        placeholder="Gênero"
        value={form.genre}
        onChange={handleChange}
      />
      <input
        name="authors"
        placeholder="Autores"
        value={form.authors}
        onChange={handleChange}
      />

      <label className="file-label">Imagem de capa:</label>
      <input
        id="coverInput"
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
      />

      <label className="file-label">Imagens adicionais:</label>
      <input
        id="imagesInput"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Previews das imagens adicionais */}
      <div className="image-previews">
        {imagePreviews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="preview-thumbnail"
          />
        ))}
      </div>

      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddWorkForm;
