import express from 'express';
import cors from 'cors';
import { DatabasePostgres } from './databasePostgres';
import './createTable.js';

const app = express();
app.use(cors());
app.use(express.json());

const database = new DatabasePostgres();

app.get('/users', async (req, res) => {
    const users = await database.list();
    res.json(users);
});

app.post('/users', async(req, res) => {
    const user = req.body;
    await database.create(user);
    res.status(201).send();
});

app.put('/users/:id', async(req, res) => {
    const id = req.params.id;
    const user = req.body;
    await database.update(id, user);
    res.status(204).send();
});

app.delete('/users/:id', async(req,res) => {
    const id = req.params.id;
    await database.delete(id);
    res.status(204).send();
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});