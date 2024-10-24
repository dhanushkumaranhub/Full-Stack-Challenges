const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
});


app.put('/api/tasks/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});


app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do App API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
