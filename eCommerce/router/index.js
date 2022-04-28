const { Router } = require('express')
//Const Contenedor = require('../models/Contenedor')
//Const contenedor = new Contenedor('./data/productos.txt');
const { productDaos: ProductModel } = require('../daos/mainDaos.js')
const contenedor = new ProductModel
const router = Router();

//router.get('/', (req, res) => {
//    res.render("formulario")
//});



router.post('/', async (req, res) => {
    const prodAgregado = await contenedor.save(req.body);
    res.status(200).send({
        status: 200,
        message: 'Action OK',
      });
    //res.redirect('/productos?admin=true');
});

router.get('/', async (req, res) => {
    const productos = await contenedor.getAll();
    res.status(200).send({
        status: 200,
        data: {
          productos,
        },
        message: 'Action OK',
      });
    //res.render("listaProd", {productos: productos, req});
});

router.get('/:producto', async (req, res) => {
    const prodPedido = await contenedor.getById(req.params.producto);
    res.status(200).send({
        status: 200,
        data: {
            prodPedido,
        },
        message: 'Action OK',
      });
    //res.render("detalleProd", {productos: prodPedido, req})
});

router.put('/:id', async (req, res) => {
    if (req.query.admin) {
    const updated = await contenedor.updateById(req);
    res.status(200).send({
        status: 200,
        data: {
            updated,
        },
        message: 'Action OK',
      });
    //res.redirect(`/productos/${req.params.id}?admin=true`)
    }else{
        res.json("ACCION NO AUTORIZADA")
    }
});

router.delete('/:id', async (req, res) => {
    if (req.query.admin) {
        const exterminated = await contenedor.deleteById(req.params.id);
        res.status(200).send({
            status: 200,
            data: {
                exterminated,
            },
            message: 'Action OK',
          });
        //res.redirect('/productos?admin=true');
    }else{
        res.json("ACCION NO AUTORIZADA")
    }
    
});

router.delete('/', async (req, res) => {
    if (req.query.admin) {
        const exterminated = await contenedor.deleteAll();
        res.status(200).send({
            status: 200,
            data: {
                exterminated,
            },
            message: 'Action OK',
          });
        //res.redirect('/productos?admin=true');
    }else{
        res.json("ACCION NO AUTORIZADA")
    }
    
});

module.exports = router;