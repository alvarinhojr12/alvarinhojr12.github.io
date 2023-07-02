const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static('logs'));

app.post('/gerar_pagina', (req, res) => {
  const { link } = req.body;

  if (link) {
    const template = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Protetor de Link</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <style>
          .circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }
        </style>
        <script>
          function desbloquearLink() {
            var contador = 15;
            var contadorElemento = document.getElementById("contador");
            var linkElemento = document.getElementById("link");

            var intervalo = setInterval(function() {
              contador--;
              contadorElemento.innerHTML = contador;

              if (contador <= 0) {
                clearInterval(intervalo);
                contadorElemento.style.display = "none";
                linkElemento.style.display = "block";
              }
            }, 1000);
          }
          desbloquearLink();
        </script>
      </head>
      <body>
        <div class="container mt-5">
          <h1 class="text-center">Protetor de Link</h1>

          <div class="d-flex justify-content-center mt-4">
            <div class="circle">
              <span id="contador">15</span>
            </div>
          </div>

          <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-primary" onclick="desbloquearLink()">Desbloquear</button>
          </div>

          <div class="d-flex justify-content-center mt-4">
            <a id="link" href="${link}" class="btn btn-success" style="display: none;">Ver Página Gerada</a>
          </div>
        </div>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
    `;

    const filename = `pagina_${Date.now()}.html`;
    const filePath = path.join(__dirname, 'logs', filename);

    fs.writeFile(filePath, template, (err) => {
      if (err) {
        console.error(err);
        res.json({ success: false });
      } else {
        const pageLink = `http://localhost:3000/${filename}`;
        res.json({ success: true, pageLink: pageLink });
      }
    });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
  
