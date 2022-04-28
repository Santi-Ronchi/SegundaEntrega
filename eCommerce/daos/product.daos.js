const mongoose = require('mongoose');
const schemaProd = require('./modelsMDB/schemaProd.js');

class Product {
    constructor(){
        this.path = 'productos.txt'
        this.idCount = '1'
    }
    

    async connectMongo(){
        try{
            const URL =
            'mongodb+srv://sronchi:asd456@cluster0.dgjch.mongodb.net/ecommerce?retryWrites=true&w=majority'
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('BASE DE DATOS ARRIBA');
        }catch(e){
            console.log(e);
        }
    }

    async save(obj){
        try{
            await this.connectMongo();
            await schemaProd.create(obj)
            mongoose.disconnect();
        }catch(e){
            console.log(e);
        }
        //let entryControl = false;
        //try{
        //    const content = fs.readFileSync(this.path)
        //    const content_parsed = JSON.parse(content)
        //    content_parsed.forEach(element => {
        //        if (obj.titulo === element.titulo) {
        //            entryControl = true;
        //        }});
        //    if (!entryControl || content_parsed.length == 0) {
        //        obj["timestamp"] = Date.now();
        //        obj["id"] = (content_parsed[content_parsed.length -1].id) + 1
        //        fs.writeFileSync(this.path,JSON.stringify([...content_parsed,obj]))
        //        return ((content_parsed[content_parsed.length -1].id) + 1);
        //    }
        //}
        //catch(err){
        //    fs.writeFileSync(this.path,JSON.stringify([{...obj, timestamp: Date.now(), id: 1}]))
        //    return (1);
        //}
        
    }

    async getById(numero) {

        try {
            await this.connectMongo();
            const show = await schemaProd.findById(numero)
            mongoose.disconnect();
            return show;
        } catch (error) {
            console.log(error);
        }
        //try {
        //    if (!fs.existsSync(this.path)) {
        //        throw Error('File does not exist.');
        //    }
        //    const content = await fs.promises.readFile(this.path, 'utf-8');
        //    let object = null;
        //    object = JSON.parse(content).filter(({id}) => id === parseInt(numero));
        //    if (object.length == 0) {
        //        return {error: 'producto no encontrado'}
        //    }else{
        //        return object
        //    }
        //} catch (error) {
        //    throw Error(error.message);
        //}
    }

    async getAll() {
        await this.connectMongo();
        try {
            const showAll = await schemaProd.find();
            mongoose.disconnect();
            return showAll;
        } catch (error) {
            console.log(error);
        }

        //try {
        //    if (!fs.existsSync(this.path)) {
        //        throw Error('File does not exist.');
        //    }
        //    const content = await fs.promises.readFile(this.path, 'utf-8');
        //    return JSON.parse(content);
        //} catch (error) {
        //   return (err);
        //}
    }

    async deleteById(numero) {
        try {
            await this.connectMongo();
            const exterminate = await schemaProd.deleteOne({id: `${numero}`})
            mongoose.disconnect();
            return exterminate;
        } catch (error) {
            console.log(error);
        }

        //try {
        //    if (isNaN(numero)){
        //        console.log("CHECKPOINT fail");
        //        throw Error('Method expects a number.');
        //    }
        //    if (!fs.existsSync(this.path)) {
        //        throw Error('File does not exist.');
        //    }
        //    const content = fs.readFileSync(this.path);
        //    const content_parsed = JSON.parse(content);
        //    console.log("CHECKPOINT 1: " + content_parsed);
        //    const newList = content_parsed.filter(element => element.id !== parseInt(numero));
        //    console.log("CHECKPOINT 2: " + newList);
        //    await fs.promises.writeFile(this.path, JSON.stringify(newList, null, 2), 'utf-8');
        //} catch (error) {
        //    throw Error(error.message);
        //}
    }

    async deleteAll() {
        await this.connectMongo();
        try {
            const showAll = await schemaProd.deleteMany();
            mongoose.disconnect();
            return showAll;
        } catch (error) {
            console.log(error);
        }

        //try {
        //    if (!fs.existsSync(this.path)) {
        //        throw Error('File does not exist.');
        //    }
        //    let content = []
        //    await fs.promises.writeFile(this.path, content, 'utf-8');
        //} catch (error) {
        //    throw Error(error.message);
        //}
    }

    async updateById(req) {

        const {name,price,url,description,code,stock} = req.body;
        const idURL = parseInt(req.params.id);
        try {
            await this.connectMongo();
            const updated = await schemaProd.updateOne({id: `${idURL}`}, {name: `${name}`, price: `${price}`, url: `${url}`, description: `${description}`, code: `${code}`, stock: `${stock}`})//, {price: `${price}`}, {url: `${url}`}, {description: `${description}`}, {code: `${code}`}, {stock: `${stock}`})
            mongoose.disconnect();
            return updated;
        } catch (error) {
            console.log(error);
        }

        //const {titulo,precio,url,descripcion,codigo,stock} = req.body;
        //const idURL = parseInt(req.params.id);
        //const content = JSON.parse(fs.readFileSync(this.path));
        //
        //try {
        //    let busqueda = content.find(el => el.id == idURL)
        //    if(busqueda.id === idURL){
        //        busqueda.titulo = titulo;
        //        busqueda.precio = precio;
        //        busqueda.url = url;
        //        busqueda.descripcion = descripcion;
        //        busqueda.codigo = codigo;
        //        busqueda.stock = stock;
        //        const json_products=JSON.stringify(content);
        //        fs.writeFileSync(this.path,json_products,'utf-8');
        //        return busqueda;
        //    }
        //} catch (error) {
        //    throw "Error server"
        //}
    }

    async getRandom() {
        const numero = Math.floor(Math.random() * 3) + 1;
        const obj = this.getById(numero).then(val => {return val});
        return obj
    }

} 


module.exports = Product;