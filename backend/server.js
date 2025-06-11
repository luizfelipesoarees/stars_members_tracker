const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors({ origin: ['http://localhost:8171', 'http://201.23.3.86:8171'] }));
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || 'stars_db',
  process.env.DB_USER || 'stars_user',
  process.env.DB_PASS || 'stars_password',
  {
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

// Define Member model
const Member = sequelize.define('Member', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  rank: {
    type: DataTypes.STRING,
    defaultValue: 'Operative'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    validate: { isIn: [['active', 'missing', 'deceased']] }
  },
  bio: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('S.T.A.R.S. Members Tracker API - Resident Evil');
});

// --- ROTAS CRUD ---

// GET /api/members - listar todos membros
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar membros.' });
  }
});

// GET /api/members/:id - buscar membro por id
app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Membro não encontrado.' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar membro.' });
  }
});

// POST /api/members - criar novo membro
app.post('/api/members', async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar membro.', details: error.message });
  }
});

// PUT /api/members/:id - atualizar membro existente
app.put('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Membro não encontrado.' });
    await member.update(req.body);
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar membro.', details: error.message });
  }
});

// DELETE /api/members/:id - remover membro
app.delete('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Membro não encontrado.' });
    await member.destroy();
    res.json({ message: 'Membro removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover membro.' });
  }
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Aguarda banco de dados com retries
async function waitForDatabase(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
      return;
    } catch (error) {
      console.log(`Tentativa ${i + 1} falhou. Repetindo em ${delay / 1000}s...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('❌ Falha ao conectar ao banco após múltiplas tentativas.');
}

// Inicia o servidor
async function startServer() {
  try {
    await waitForDatabase();
    await sequelize.sync({ alter: true });
    console.log('✅ Banco de dados sincronizado');

    const PORT = process.env.APP_PORT || 8170;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
