import React, { useState, useEffect } from "react";
import "./Home.css";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import RatingContent from "../../components/RatingContent/RatingContent";
import ImageSlider from "../../components/ImageSlider/ImageSlider";

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [obras, setObras] = useState([]);
  const [yearAsc, setYearAsc] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/obras")
      .then((res) => res.json())
      .then((data) => {
        console.log("Obras:", data);
        setObras(data);
      })
      .catch((error) => console.error("Erro ao buscar Obras:", error));
  }, []);
  
  const top5Ids = [38, 43, 32, 19, 14];
  const getFilteredObras = () => {
    let filtered = [...obras];

    if (selectedCategory) {
      filtered = filtered.filter(
        (obra) =>
          obra.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedFilter === "Top 5") {
      filtered = filtered.filter((obra) => top5Ids.includes(obra.id));
      filtered.sort((a, b) => top5Ids.indexOf(a.id) - top5Ids.indexOf(b.id));
    }

    if (selectedFilter === "Ano") {
      filtered.sort((a, b) => (yearAsc ? a.year - b.year : b.year - a.year));
    }

    if (selectedFilter === "Add Recente") {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);

    if (filter === "Ano") {
      setYearAsc((prev) => !prev);
    }
  };

  const handleDropdownToggle = (isOpen) => {
    if (isOpen) {
      setSelectedFilter("Dropdown");
    }
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedFilter("Categoria");
  };

  return (
    <div className="home-container">
      <ImageSlider />

      <div className="title-list-view">
        <h2>List View</h2>
        <span className="line-2" />
      </div>

      <div className="category-controls">
        <Dropdown className="custom-dropdown">
          <Dropdown.Toggle
            variant="custom"
            className={`custom-toggle ${
              selectedFilter === "Categoria" ? "active" : "inactive"
            }`}
          >
            Categoria
          </Dropdown.Toggle>
          <Dropdown.Menu className="custom-menu">
            {["Anime", "Filme", "Série"].map((label) => (
              <Dropdown.Item
                key={label}
                onClick={() => handleCategorySelect(label)}
              >
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {["Top 5", "Todos", "Ano", "Add Recente"].map((label) => (
          <Button
            key={label}
            className={`category-button ${
              selectedFilter === label ? "active" : "inactive"
            }`}
            onClick={() => handleFilterClick(label)}
          >
            {label}
          </Button>
        ))}
      </div>

      {getFilteredObras().map((obra) => (
        <React.Fragment key={obra.id}>
          <div className="list-content">
            <Link to={`/obras/${obra.id}`} className="image-list-cover">
              <img
                src={`http://localhost:4000/uploads/${obra.cover}`}
                alt={obra.title}
              />
            </Link>
            <div className="info-content">
              <div className="info-items">
                <Link to={`/obras/${obra.id}`} className="title-list">
                  <p>{obra.title}</p>
                </Link>
                <p className="year-list">({obra.year})</p>
                <p className="description-list">{obra.description}</p>
              </div>
            </div>
            <div className="rating-content">
              <p className="rating-item">{obra.rating}/10</p>
              <RatingContent ratingText={`${obra.rating}/10`} />
            </div>
          </div>
          <div className="line" />
        </React.Fragment>
      ))}

      <div className="admin-button">
        <Link to="/login">
          <Button>Admin</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
