const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here 
  if (req.method==='GET' && req.url.startsWith('/static')) {
    const urlArr = req.url.split('/')
    const [blank, static, folder, file] = urlArr;
    const [fileName, extension] = file.split('.')

    let contentType = extension === 'css' ? 'text/css': 'image/jpeg';

    const responseFile = fs.readFileSync(`./assets/${folder}/${file}`);

    res.statusCode = 200;

    res.setHeader('Content-Type', contentType);

    return res.end(responseFile);
  }

  const html = fs.readFileSync('./index.html');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);


});

const port = 8000;

server.listen(port, () => console.log('Server is listening on port', port));