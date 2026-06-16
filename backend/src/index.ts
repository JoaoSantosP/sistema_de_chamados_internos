import express from 'express';
import './database/connection';
import chamadoRouter from './routes/chamado_router';

const app = express();

app.use(express.json());

app.use('/chamados', chamadoRouter);

const port = process.env.PORT || 3000;

/* app.get('/', (req, res) => {
  res.send('Hello, World!');
}); */

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 