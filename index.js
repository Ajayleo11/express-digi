import express from "express";

const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello from Ajay and his tea!')
})

app.get('/ice-tea', (req, res) => {
    res.send('What ice tea do you prefer?')
})

app.get('/twitter', (req, res) => {
    res.send('ajaydotcom')
})

app.use(express.json())

let teaData = []
let nextId = 1

//add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newTea = { id : nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)

})

//get all teas
app.get('/teas', (req, res) => {
    res.status(201).send(teaData)
})

//get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(201).send(tea)

})

//Update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    const {name, price} = req.body
    tea.pice = price
    tea.name = name
    res.status(200).send(tea)
})

//Delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(204).send('deleted')

})

app.listen(() =>{
    console.log(`Server is running at port: ${port}...`)
})