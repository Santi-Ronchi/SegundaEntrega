const { Router } = require('express')
//const ContenedorCarro = require('../models/ContenedorCarro')
//const contenedorCarro = new ContenedorCarro('./data/carros.txt');
//const Contenedor = require('../models/Contenedor')
//const contenedorProd = new Contenedor('./data/productos.txt')
const { carritoDaos: CartModel } = require('../daos/mainDaos.js')
const contenedorCarro = new CartModel


const routerCarro = Router();

routerCarro.post('/', async (req, res) => {
    const carroAgregado = await contenedorCarro.saveCarro(req.body);
    res.status(200).send({
        status: 200,
        data: carroAgregado,
        message: 'Action OK',
      });
    //res.redirect(`/carro/${carroAgregado}`);
});

routerCarro.get('/', async (req, res) => {
    const carros = await contenedorCarro.getAll();
    res.status(200).send({
        status: 200,
        data: {
            carros,
        },
        message: 'Action OK',
      });
    //res.render("listaCarro", {productos: carros, req});
});

routerCarro.delete('/', async (req, res) => {
    if (req.query.admin) {
        await contenedorCarro.deleteAll();
        res.status(200).send({
            status: 200,
            message: 'DELETE ALL OK',
          });
    }else{
        res.json("ACCION NO AUTORIZADA")
    }
});

routerCarro.delete('/:carroId', async (req, res) => {
    const exterm = await contenedorCarro.deleteById(req.params.carroId);
    res.status(200).send({
        status: 200,
        data: exterm,
        message: 'DELETE OK',
      });
    //res.redirect('/carro');
});

routerCarro.get('/:carroId', async (req, res) => {
    const carroPedido = await contenedorCarro.getById(req.params.carroId);
    res.status(200).send({
        status: 200,
        data: {
            carroPedido
        },
        message: 'Action OK',
      });
    //res.render("detalleCarro", {carroPedido: carroPedido, req})
});

routerCarro.delete('/:carroId/:prodId', async (req, res) => {
    const carroPedido = await contenedorCarro.deleteProductById(req.params.carroId, req.params.prodId);
    res.status(200).send({
        status: 200,
        message: 'ITEM DELETED OK',
      });
    //res.redirect(`/carro/${req.params.carroId}`)
});

routerCarro.post('/:carroId/:prodId', async (req, res) => {
    const prodAgregado = await contenedorCarro.addToCart(req.params.carroId, req.params.prodId);
    res.status(200).send({
        status: 200,
        data: {
            prodAgregado,
        },
        message: 'Action OK',
      });
    //res.redirect(`/carro/${req.params.carroId}`);
});

module.exports = routerCarro;