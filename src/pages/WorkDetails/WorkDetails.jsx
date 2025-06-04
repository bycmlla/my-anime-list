import React, { useEffect, useState } from "react";
import "./WorkDetails.css";
import { useParams } from "react-router-dom";
import RatingContent from "../../components/RatingContent/RatingContent";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const WorkDetails = () => {
  const { id } = useParams();
  const [obra, setObra] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:4000/obras/${id}`)
      .then((res) => res.json())
      .then((data) => setObra(data))
      .catch((err) => console.error("Erro ao buscar obra:", err));
  }, [id]);

  if (!obra) return <div>Carregando...</div>;
  console.log("Imagem de fundo:", obra.imagens[0]);

  return (
    <div
      className="work-details"
      style={{
        backgroundColor: obra.dominant_color || "#000",
      }}
    >
      <div
        className="work-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 40%, ${
            obra.dominant_color || "#000"
          }), url(http://localhost:4000/uploads/${encodeURIComponent(
            obra.imagens[0].url
          )})`,
        }}
      >
        <Link to="/" className="back-icon">
          <IoMdArrowRoundBack />
        </Link>
      </div>
      <div className="work-container">
        <div className="work-content-header">
          <h1 className="work-title">{obra.title}</h1>
          <p>{obra.year}</p>
          <p>{obra.genre}</p>
          <RatingContent ratingText={`${obra.rating}/10`} />
        </div>
        <div className="work-content-body">
          <div className="work-cover">
            <img src={`http://localhost:4000/uploads/${obra.cover}`} />
          </div>

          <div className="work-details-text">
            <p>Autores: {obra.authors}</p>
            <p className="work-description">{obra.description}</p>
          </div>
        </div>
        <h4 className="galery">Imagens Favoritas</h4>

        <div className="all-images">
          {obra.imagens.map((imagem, index) => (
            <img
              key={index}
              src={`http://localhost:4000/uploads/${imagem.url}`}
              alt={`Imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkDetails;
