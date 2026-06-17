import express from 'express';
import './database/connection';
import chamadoRouter from './routes/chamado_router';
import responsaveisRouter from './routes/responsaveis_router';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/chamados', chamadoRouter);
app.use('/responsaveis', responsaveisRouter);

const port = process.env.PORT || 3000;

/* app.get('/', (req, res) => {
  res.send('Hello, World!');
}); */

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 