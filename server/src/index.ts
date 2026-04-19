import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

// Rota: concurso mais recente
app.get('/concurso/recente', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1'
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar concurso recente' });
  }
});

// Rota: concurso por número
app.get('/concurso/:numero', async (req: Request, res: Response) => {
  const numero = parseInt(req.params.numero);
  try {
    const result = await pool.query(
      'SELECT * FROM megasena WHERE concurso = $1',
      [numero]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ mensagem: `Concurso ${numero} não encontrado.` });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar concurso' });
  }
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});