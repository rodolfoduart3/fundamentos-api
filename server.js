const express = require('express');
const app = express();
const data = require('./data.json');

// Informando o Express para operar em arquivos no formato JSON
app.use(express.json());

// *** [GET] ***
app.get('/clients', function(req, res) {
    res.json(data);
});
app.get('/clients/:id', function(req, res) {
    const { id } = req.params;
    const client = data.find(c => c.id == id);
    // Caso o 'client' não exista, retorna um erro 204
    if (!client) return res.status(204).json();
    res.json(client);
});

// *** [POST] ***
app.post('/clients', function(req, res) {
    // Supondo que está sendo enviado um JSON da seguinte forma = { name: "Nome Sobrenome", email: "meuemail@gmail.com" }
    const { name, email } = req.body;
    // A seguir, deverá ser feita a lógica específica para salvar os dados, etc...
    res.json({ name, email });
});

// *** [PUT] ***
app.put('/clients/:id', function(req, res) {
    // Supondo que está sendo enviado um JSON da seguinte forma = { name: "Novo Nome" } --> http://localhost:3100/clients/1 (alterando o ID '1')
    const { id } = req.params;
    const client = data.find(c => c.id == id);
    // Caso o 'client' não exista, retorna um erro 204
    if (!client) return res.status(204).json();
    // Capturando apenas o 'name' da requisição e alterando a informação
    const { name } = req.body;
    client.name = name;
    res.json(client);
});

// *** [DELETE] ***
app.delete('/clients/:id', function(req, res) {
    // Supondo que está sendo acessado da seguinte forma --> http://localhost:3100/clients/1 (excluindo o ID '1')
    const { id } = req.params;
    const clientsFiltered = data.filter(c => c.id != id); 
    res.json(clientsFiltered);
});

app.listen(3100, function() {
    console.log('running...')
});