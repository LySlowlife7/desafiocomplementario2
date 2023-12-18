import { productosModel } from "./models/productosModel.js";

export class ProductosManagerMongo{
    constructor(){
        this.model=productosModel;
    };

    async crearProducto(productoInfo){
        try {
            const result = await this.model.create(productoInfo);
            return result;
        } catch (error) {
            console.log("Producto Creado:", error.message);
            throw new Error("ERROR al crear el producto");
        }
    };
}