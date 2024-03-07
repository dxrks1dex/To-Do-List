const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todoModel')
const cors = require('cors');
const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello Todo API')
})

// app.get('/todos', (req, res) => {
//     res.send('toods api')
// })

app.get('/todos', async(req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/todos/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/todos', async(req, res) => {
    try {
        const todos = await Todo.create(req.body)
        res.status(200).json(todos);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);
        if(!todo){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Todo.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/todos/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({message: `cannot find any todo with ID ${id}`})
        }
        res.status(200).json(todo);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:12345678Admin@dxrkside.ukpa2ex.mongodb.net/Node-API?retryWrites=true&w=majority&appName=dxrkside')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})