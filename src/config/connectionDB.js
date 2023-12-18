import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://azul:florymini22@clusterinicial.nrxgnzs.mongodb.net/');
        console.log(`Base de datos conectada`);
    } catch (error) {
        console.log(`ERROR al conectar la Base de datos ${error}`)
    }
};