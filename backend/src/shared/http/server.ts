import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import router from '@shared/http/routes/routes';

const app = express();

dotenv.config();

app.use(express.json());

// Configuração do CORS
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3333'],
    methods: ['GET', 'POST','DELETE','UPDATE','PUT'],

  }));
  
app.use('/api/v1/', router);

app.use(errors());

// Iniciando servidor
app.listen(process.env.NUMBER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.NUMBER_PORT}`);
});
