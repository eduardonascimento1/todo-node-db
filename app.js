const express = require('express');
const path = require('path');
const { Todo } = require('./models');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const todos = await Todo.findAll();
    res.render('index', { todos });
});

app.post('/create', async (req, res) => {
    const title = req.body.title;
    await Todo.create({
        title: title,
        completed: false,
    });
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.destroy({
        where: {
            id: id
        }
    })
    res.redirect('/');
});

app.get('/complete/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.update({ completed: true }, {
        where: {
            id: id
        }
    });
    res.redirect('/');
});

app.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    await Todo.update({ title: title }, {
        where: {
            id: id
        }
    });
    res.redirect('/');
});

module.exports = app;
