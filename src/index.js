const bodyParser = require('body-parser')
const app = require('express')()

const { response, request } = require('express')


// app.use(bodyParser.json())

let clientes = [
    {id: 1, nome: 'Vaniel Timm', celular: '53984111522'},
    {id: 2, nome: 'Daniel Pereira', celular: '53984111535'},
    {id: 3, nome: 'josé Santos', celular: '53984501522'},
    {id: 4, nome: 'Mikaela da Silva', celular: '53991111522'}, 
]

function log (request, response, next){
    const {url, method} = request
    console.log(`${method} - ${url} at ${new Date()}`)
    return next()
}
app.use(log)


app.get('/clientes', (request, response) =>{
    return response.json(clientes)
})

app.get('/clientes/:id', (request, response) =>{
    const {id} = request.params
    const cliente = clientes.find(value => value.id ==id)
    if (cliente == undefined)
    {
        response.status(400).send()
    }else{
        response.status(200).json(cliente)
    }


//     const cliente = clientes.filter (value => value.id == request.params.id)
//    return response.json(cliente)
})

app.post('/clientes', (request, response) =>{
    const cliente = request.body
    clientes.push(cliente)
    response.status(201).json(cliente)
})

app.put('clientes/:id', (request, response) =>{
    const id = request.params.id
    const nome = request.body.nome
    
    let cliente = clientes.find(value => value.id == id)
    if (cliente == undefined)
    {
        response.status(400).send()
    }else{
    cliente.nome = nome
    response.status(200).json(cliente)
}})

app.delete('clientes/:id', (response, request) =>{
    const {id} = request.params
    const index = clientes.findIndex(value => value.id == id)
    if(index == -1){
        response.status(400).send()
    }else{
        clientes.splice(index, 1)
        response.status(204).send()
    }
})
app.listen(3000)