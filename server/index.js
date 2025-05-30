  const express = require("express");
  const app = express();
  const mysql = require("mysql2");
  const multer = require("multer");
  const path = require("path");
  const port = 4000;
  const cors = require("cors");
  const getColors = require("get-image-colors");
  const fs = require("fs");
  require("dotenv").config();

  app.use(cors());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(express.json());



  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });
  const upload = multer({ storage });

  const con = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "myanimelist",
  });

  con.connect((err) => {
    if (err) {
      console.log("Erro ao conectar ao Banco de Dados... ", err);
      return;
    }

    console.log("Conexão estabelecida!");
  });

  ///rotas

  app.post("/api/login", (req, res) => {
    const { senha } = req.body;

    if (senha === process.env.ADMIN_PASSWORD) {
      return res.json({ token: "meu-token-seguro" });
    }

    return res.status(401).json({ message: "Senha incorreta" });
  });

  app.post(
    "/obras",
    upload.fields([
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    async (req, res) => {
      try {
        const { title, category, year, description, rating, genre, authors } = req.body;
        const coverFile = req.files["cover"]?.[0]?.filename || null;
        const additionalImages = req.files["images"] || [];

        const sqlObra = `
          INSERT INTO obras (title, category, year, description, rating, genre, authors, cover, dominant_color)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)
        `;

        con.query(
          sqlObra,
          [title, category, year, description, rating, genre, authors, coverFile],
          async (err, result) => {
            if (err) {
              console.log("Erro ao inserir obra:", err);
              return res.status(500).send("Erro ao inserir obra");
            }

            const obraId = result.insertId;

            if (additionalImages.length > 0) {
              const sqlImages = `INSERT INTO imagens_obras (obra_id, url) VALUES ?`;
              const values = additionalImages.map((file) => [obraId, file.filename]);

              con.query(sqlImages, [values], async (err2) => {
                if (err2) {
                  console.log("Erro ao inserir imagens:", err2);
                  return res.status(500).send("Erro ao inserir imagens");
                }

                const firstImageFilename = additionalImages[0].filename;
                const firstImagePath = path.join(__dirname, "uploads", firstImageFilename);

                try {
                  const colors = await getColors(firstImagePath);
                  const dominantColor = colors[0].hex();

                  const updateSql = `UPDATE obras SET dominant_color = ? WHERE id = ?`;
                  con.query(updateSql, [dominantColor, obraId], (err3) => {
                    if (err3) {
                      console.log("Erro ao atualizar cor dominante:", err3);
                      return res.status(500).send("Erro ao atualizar cor dominante");
                    }

                    return res.status(201).send("Obra, imagens e cor inseridas com sucesso");
                  });
                } catch (colorErr) {
                  console.log("Erro ao extrair cor da imagem:", colorErr);
                  return res
                    .status(500)
                    .send("Obra e imagens inseridas, mas erro ao extrair cor");
                }
              });
            } else {
              return res.status(201).send("Obra inserida com sucesso (sem imagens)");
            }
          }
        );
      } catch (err) {
        console.error("Erro geral na inserção:", err);
        return res.status(500).send("Erro interno ao inserir obra");
      }
    }
  );

  app.get("/obras", (req, res) => {
    con.query("SELECT * FROM obras", (err, results) => {
      if (err) {
        console.log("Erro ao buscar obras:", err);
        return res.status(500).send("Erro ao buscar");
      }
      res.json(results);
    });
  });
  app.get("/obras/:id", (req, res) => {
    const { id } = req.params;

    const sqlObra = "SELECT * FROM obras WHERE id = ?";
    const sqlImagens = "SELECT url FROM imagens_obras WHERE obra_id = ?";

    con.query(sqlObra, [id], (err, obraResult) => {
      if (err || obraResult.length === 0) {
        console.log("Erro ao buscar obra:", err);
        return res.status(404).send("Obra não encontrada");
      }

      const obra = obraResult[0];

      con.query(sqlImagens, [id], (err2, imagensResult) => {
        if (err2) {
          console.log("Erro ao buscar imagens:", err2);
          return res.status(500).send("Erro ao buscar imagens");
        }

        obra.imagens = imagensResult;
        res.json(obra);
      });
    });
  });

  app.listen(port, (error) => {
    if (error) {
      console.log("Error");
      return;
    }
    console.log("Is alright!");
  });
