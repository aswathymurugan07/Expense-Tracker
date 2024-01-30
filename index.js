const express = require('express');
const mongoose = require('mongoose');
const app = express()
const Expense = require('./models/expense');
mongoose.connect('mongodb+srv://aswathyms:07-Nov-02@cluster0.qiw07jx.mongodb.net/newDb?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

app.use(express.json());

app.get('/expense', async (req, res) => {
    const result = await Expense.find();
    res.send(result);
})

app.get('/expense/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Expense.findById(id);
        if (result)
            res.send(result);
        else
            res.send("No expense related to that id")

    } catch (err) {
        res.send(err);
    }

    // const result = await Expense.find();
    // res.send(result);
})


app.delete('/expense/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if (result)
            res.send(result);
        else
            res.send("No expense related to that id")

    } catch (err) {
        res.send(err);
    }

   
})


app.post('/expense', async (req, res) => {
    try{
        console.log(req.body);
        const newExpense = req.body;
        await Expense.create(newExpense);
        res.send("Created");
    }catch(err)
    {
        res.send(err);
    }  
   
})


app.put('/expense/:id', async (req, res) => {
        const id = req.params.id;
        const updateObject = req.body;
        const updatedObject = await Expense.findByIdAndUpdate(id, {$set:updateObject}, {
            new: true,
        });
        res.send(updatedObject);  
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})