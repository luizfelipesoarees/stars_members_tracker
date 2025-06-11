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

// CRUD routes...

// Rota de teste
app.get('/', (req, res) => {
  res.send('S.T.A.R.S. Members Tracker API - Resident Evil');
});

// 🔁 Aguarda banco de dados com retries
async function waitForDatabase(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
      return;
    } catch (error) {
      console.log(`Tentativa ${i + 1} de conexão falhou. Repetindo em ${delay / 1000}s...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('❌ Falha ao conectar ao banco de dados após múltiplas tentativas.');
}

// 🚀 Inicia o servidor
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
