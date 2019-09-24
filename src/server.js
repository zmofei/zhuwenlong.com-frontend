import express from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from './App';
import fs from 'fs';
import url from 'url';

const app = express();
const router = express.Router();

const html = fs.readFileSync(url.resolve(__dirname, './build/index.html'));

const htmlArr = html.toString().split('<div id="root"></div>');
app.use((req, res) => {
  res.write(htmlArr[0] + '<div id="root">');
  const stream = ReactDOMServer.renderToNodeStream(<App hostname={req.hostname}/>);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write('</div>' + htmlArr[1]);
    res.end();
  });

});


app.listen(3029);