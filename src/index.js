const bodyParser = require('body-parser')
const app = require('express')()

const { response, request } = require('express')


app.use(bodyParser.json())

let clientes = [
    {id: 1, nome: 'Vaniel Timm', celular: '53984111522'},
    {id: 2, nome: 'Daniel Pereira', celular: '53984111535'},
    {id: 3, nome: 'josé Santos', celular: '53984501522'},
    {id: 4, nome: 'Mikaela da Silva', celular: '53991111522'}, 
]

app.get('/clientes', (request, response) =>{
    return response.json(clientes)
})

app.get('/clientes/:id', (request, response) =>{
    const cliente = clientes.filter (value => value.id == request.params.id)
   return response.json(cliente)
})

app.post('/clientes', (request, response) =>{
    const cliente = request.body
    clientes.push(cliente)
    response.json(cliente)
})

app.put('clientes/:id', (request, response) =>{
    const id = request.params.id
    const nome = request.body.nome
    
    let cliente = clientes.filter(value => value.id == id)

    cliente[0].nome = nome
    response.json(cliente[0])
})

app.delete('clientes/:id', (response, request) =>{
    const id = request.params.id
    clientes.filter(value => value.id != id)
    response.json(clientes)
})
app.listen(3000)