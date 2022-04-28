const firebase = require('firebase-admin');
const configuraciones = require('./db/segundaentrega-b078d-firebase-adminsdk-mp56f-171e64358a.json');
const ProductoModel = require('./product.daos');
const products = new ProductoModel();



class Cart {
    constructor() {
        firebase.initializeApp({
            credential: firebase.credential.cert(configuraciones),
            databaseURL: 'https://segundaentrega-b078d-default-rtdb.firebaseio.com'
        })
    }

    async saveCarro(){
        const db = firebase.firestore();
        const query = db.collection('carritos');
        const newId = ((await query.get()).size) + 1;
        let today = new Date();

        try {
            const doc = query.doc();
            const newCart = await doc.create({
                id: newId,
                timestamp: today.getUTCMilliseconds(),
                products: []
            })
        return newCart;
        } catch (error) {
            console.log(error);
        }

        //try{
        //    const content = fs.readFileSync(this.path)
        //    const content_parsed = JSON.parse(content)
        //    obj["listaProd"] = [];
        //    obj["timestamp"] = Date.now();
        //    obj["id"] = (content_parsed[content_parsed.length -1].id) + 1;
        //    console.log(this.path,JSON.stringify([...content_parsed,obj]));
        //    fs.writeFileSync(this.path,JSON.stringify([...content_parsed,obj]), null, 2)
        //    return ((content_parsed[content_parsed.length -1].id) + 1);
        //}
        //catch(err){
        //    fs.writeFileSync(this.path,JSON.stringify([{...obj, listaProd: [], timestamp: Date.now(), id: 1}]))
        //    return (1);
        //}
        
    }

    async getById(numero) {
        try {
            console.log('id: ' + numero);
            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(String(numero));
            const show = await doc.get();
            return show.data();

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
        try {
            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc();
            const show = await doc.get();
            return show.data();

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

    async addToCart(cartId, prodId) {
        try {
            console.log('Entro al carro');
            let productoDB = await products.getById(prodId);
            const carrito = await this.getById(cartId);
            
            productoDB.id = Number(productoDB.id) + 6;
            //carrito.products.push(productoDB);

            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(cartId);

            const item = await doc.update({
                products: firebase.firestore.FieldValue.arrayUnion(String(productoDB))
            })

        } catch (error) {
            console.log(error);
        }
        //const carros = JSON.parse(
        //    await fs.promises.readFile(this.path, "utf-8")
        //);
        //const cart = carros.find(c => c.id === parseInt(cartId));
        //if (cart) {
        //  const fileProducts = JSON.parse(await fs.promises.readFile('./data/productos.txt', "utf-8"));
        //  const object = fileProducts.filter(({id}) => id === parseInt(prodId));
        //  if (object.length == 0) {
        //      return {error: 'producto no encontrado'}
        //  }else{
        //    cart.listaProd.push(object[0]);
        //    await fs.promises.writeFile(this.path, JSON.stringify(carros, null, 2));
        //  
        //    return ("AGREGADO OK")
        //  }
        //} else {
        //    return ("ERROR IN THE FUNCTION")
        //}
    }

    async deleteById(numero) {
        try {
            console.log('id: ' + numero);
            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(String(numero));
            const exterm = await doc.delete();
            return exterm;

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

    async deleteProductById(cartId, prodId) {
        try {
            console.log('Entro al carro');
            let productoDB = await products.getById(prodId);
            const carrito = await this.getById(cartId);
            
            productoDB.id = Number(productoDB.id) + 6;
            //carrito.products.push(productoDB);

            const db = firebase.firestore();
            const query = db.collection('carritos');
            const doc = query.doc(cartId);

            const item = await doc.update({
                products: firebase.firestore.FieldValue.arrayUnion(String(productoDB))
            })

        } catch (error) {
            console.log(error);
        }

        //const carros = JSON.parse(
        //  await fs.promises.readFile(this.path, "utf-8")
        //);
        //const cart = carros.find(c => c.id === parseInt(cartId));
        //if (cart) {
        //  const productIndex = cart.listaProd.findIndex(p => p.id === parseInt(prodId));
        //  if (productIndex > -1) {
        //    cart.listaProd.splice(productIndex, 1);
        //    await fs.promises.writeFile(this.path, JSON.stringify(carros, null, 2));
        //    return ("Product deleted");
        //  } else {
        //    return ("ERROR IN THE FUNCTION")
        //  }
        //} else {
        //    return ("ERROR IN THE FUNCTION")
        //}
    }

    async deleteAll() {
        try {
            const db = firebase.firestore();
            const ref = db.collection('carritos')
            ref.onSnapshot((snapshot) => {
              snapshot.docs.forEach((doc) => {
                ref.doc(doc.id).delete()
              })
            })
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
}

module.exports = Cart;