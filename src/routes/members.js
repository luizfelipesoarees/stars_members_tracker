const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM membros');
  res.render('index', { members: result.rows });
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', async (req, res) => {
  const { nome, codinome, funcao, status, nivel } = req.body;
  await db.query(
    'INSERT INTO membros(nome, codinome, funcao, status, nivel) VALUES($1, $2, $3, $4, $5)',
    [nome, codinome, funcao, status, nivel]
  );
  res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM membros WHERE id = $1', [req.params.id]);
  res.render('edit', { member: result.rows[0] });
});

router.post('/edit/:id', async (req, res) => {
  const { nome, codinome, funcao, status, nivel } = req.body;
  await db.query(
    'UPDATE membros SET nome = $1, codinome = $2, funcao = $3, status = $4, nivel = $5 WHERE id = $6',
    [nome, codinome, funcao, status, nivel, req.params.id]
  );
  res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM membros WHERE id = $1', [req.params.id]);
  res.redirect('/');
});

module.exports = router;