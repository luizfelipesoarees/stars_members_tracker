const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const router = require('./routes/members');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor S.T.A.R.S. rodando na porta ${PORT}`);
});