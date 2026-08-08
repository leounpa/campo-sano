// Servidor local para probar Campo Sano
const http = require("http");
const fs = require("fs");
const path = require("path");

const PUERTO = 3000;
const RAIZ = __dirname;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  let ruta = decodeURIComponent(req.url.split("?")[0]);
  if (ruta === "/") ruta = "/index.html";
  const archivo = path.join(RAIZ, ruta);
  fs.readFile(archivo, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("No encontrado");
      return;
    }
    const tipo = TIPOS[path.extname(archivo)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": tipo });
    res.end(data);
  });
}).listen(PUERTO, () => {
  console.log("Campo Sano listo en: http://localhost:" + PUERTO);
  console.log("En tu celular, abre http://TU-IP:" + PUERTO + " (ambos en la misma red wifi)");
});
