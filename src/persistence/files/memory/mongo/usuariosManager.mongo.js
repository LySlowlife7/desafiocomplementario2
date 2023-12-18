import { usuariosModel } from "./models/usuariosModel.js";

export class usuariosManagerMongo{
    constructor(){
    this.model=usuariosModel;
    };
    
    async crearUsuario(usuarioInfo){
        try {
            const result = await this.model.create(usuarioInfo);
            return result;
        } catch (error) {
            console.log("crearUsuario: ", error.message);
            throw new Error("ERROR al crear el usuario");
        }
    };

    async getUsuarioByEmail(userEmail){
        try {
            const result = await this.model.findMany({email:userEmail});
            return result;
        } catch (error) {
            console.log("getUsuarioByEmail: ", error.message);
            throw new Error("ERROR no se obtuvo al usuario");
        }
    };

    async getUsuarioById(usuarioId){
        try {
            const result = await this.model.findById(usuarioId).lean(); //Se traduce el lenguaje de la BBDD que es BSON a JSON
            return result;
        } catch (error) {
            console.log("getUsuarioById: ", error.message);
            throw new Error("ERROR no se obtuvo al usuario");
        }
    };
}