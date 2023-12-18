import { ProductosManagerFiles } from "./files/productosManagerFiles.js";
import { carritoManagerFiles } from "./files/carritoManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductosManagerMongo } from "./files/memory/mongo/productosManager.mongo.js";
import { CarritoManagerMongo } from "./files/memory/mongo/carritoManager.mongo.js";
import { UsuariosManagerMongo } from "./files/memory/mongo/usuariosManager.mongo.js";


export const productosService = new ProductosManagerMongo();
export const carritoService = new CarritoManagerMongo();
export const usuariosService = new UsuariosManagerMongo();