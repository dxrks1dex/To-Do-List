const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        id: {
            type: String
        },
        name: {
            type: String,
            required: [true, "Please enter a tood name"]
        },
        completeStatus: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)


const Todo = mongoose.model('Todo', todoSchema);

module.exports =  Todo;