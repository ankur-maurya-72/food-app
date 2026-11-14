import Todo from '../model/todo.model.js'

export const creatTodo = async(req, res) => {
    const todo = new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user: req.userId,   // associate todo with loggedin user
    })
    try{
        const newTodo = await todo.save()
        res.status(201).json({message: "todo created successfully", newTodo})
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error occuring in todo creation"})
    }
}

export const getTodos = async(req, res) => {
    try{
        const todos = await Todo.find({user: req.userId})  // fetch todo loggdin user
        res.status(200).json({message: "todo feched successfully", todos})
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error occuring in todo fetch"})
    }
}

export const updateTodo = async(req, res) => {
    try{
        const update = await Todo.findByIdAndUpdate(req.params.id, req.body,{ new: true, })
        res.status(201).json({message: "update successfully", update})
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error occuring in todo updating"})
    }
}

export const deleteTodo = async(req, res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo){
            res.status(404).json({message:"Error todo not found"})
        }
        res.status(201).json({message: "delete successfully"})
    }catch(error){
        console.log(error)
        res.status(400).json({message:"Error occuring in todo delete"})
    }
}