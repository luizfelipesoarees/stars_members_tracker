const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors({ origin: ['http://localhost:8171', 'http://201.23.3.86:8171'] }));
app.use(express.json());

// Database connection
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
    validate: {
      notEmpty: true
    }
  },
  rank: {
    type: DataTypes.STRING,
    defaultValue: 'Operative'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'missing', 'deceased']]
    }
  },
  bio: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// CRUD Routes

// Create - Adicionar novo membro
app.post('/api/members', async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read - Listar todos os membros
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Read - Obter um membro específico
app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

// Update - Atualizar um membro
app.put('/api/members/:id', async (req, res) => {
  try {
    const [updated] = await Member.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedMember = await Member.findByPk(req.params.id);
      return res.json(updatedMember);
    }
    throw new Error('Member not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete - Remover um membro
app.delete('/api/members/:id', async (req, res) => {
  try {
    const deleted = await Member.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Member deleted' });
    }
    throw new Error('Member not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota básica para teste
app.get('/', (req, res) => {
  res.send('S.T.A.R.S. Members Tracker API - Resident Evil');
});

// Sincronizar banco de dados e iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    const PORT = process.env.APP_PORT || 8170;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
