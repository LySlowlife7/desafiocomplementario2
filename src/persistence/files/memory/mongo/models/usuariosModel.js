import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
    first_name: { type:String, required:true },
    last_name: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    age:Number,
    password: { type:String, required:true },
    cart: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"carrito"
    },
    role: { type:String, enum:["user", "admin"], default:"user"}
});

export const usuariosModel = mongoose.model(usuariosCollection, usuariosSchema);