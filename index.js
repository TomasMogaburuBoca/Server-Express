const fs = require('fs');

class Container{
    constructor(file){
        this.file = file;
    }

    async save(product){
        let content = await fs.promises.readFile(this.file);
        let contObject = JSON.parse(content);
        let newId;
        if(contObject.length > 0) newId = contObject.length +1;
        else newId = 1;
        product.id = newId;
        contObject.push(product);
        await fs.promises.writeFile(this.file, JSON.stringify(contObject))
    }

    async getAll(){
        let content = await fs.promises.readFile(this.file);
        let contObject = JSON.parse(content);
        return contObject;
    }

    async getById(id){
        let contObject = await this.getAll();
        let result = contObject.find(obj => obj.id == id);
        console.log(result);
    }

    async deleteById(id){
        let contObject = await this.getAll();
        console.log(id);
        console.log(contObject);
        let eliminated = contObject.filter(e => e.id != id);
        console.log(eliminated);
        await fs.promises.writeFile(this.file, JSON.stringify(eliminated));
    }

    async deleteAll (){
        await fs.promises.writeFile(this.file, "[]")
    }
}


let product1 = {
    'title' : 'table',
    'price' : 1200,
    'thumbnail' : 'https://www.surfmarket.org/images/stories/virtuemart/product/high_5_feature.jpg',
}
let product2 = {
    'title' : 'table',
    'price' : 1500,
    'thumbnail' : 'https://www.surfmarket.org/images/stories/virtuemart/product/dumpster_diver_feature.jpg',
}
let product3 = {
    'title' : 'table',
    'price' : 2000,
    'thumbnail' : 'https://p.turbosquid.com/ts-thumb/BS/m2qc4v/9p/merrick04_0034x/jpg/1631122778/600x600/fit_q87/1e188fad733738d99f36a987023cf85efa458653/merrick04_0034x.jpg',
}
let product4 = {
    'title' : 'table',
    'price' : 1880,
    'thumbnail' : 'https://www.mundo-surf.com/10262/tabla-de-surf-channel-island-black-beauty.jpg',
}

    let product = new Container ('product.txt');
    console.log(product);
    //let cart = new Container ('cart.txt');

    const useContainer = async () => {
        await product.save(product1);
        await product.save(product2);
        await product.save(product3);
        await product.save(product4);

    // await product.deleteById(3)

    // await product.getById(2)
    }
        useContainer();
        //product.deleteAll();
        product.getAll();

module.exports = Container;