import express from "express";
import { __dirname } from "./utils.js";
import { config } from "./config/config.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productosService } from "./persistence/index.js";
import { connectDB } from "./config/connectionDB.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

import { viewsRouter } from "./routes/views.ruta.js";
import { productosRouter } from "./routes/productos.ruta.js";
import { carritoRouter } from "./routes/carrito.ruta.js";
import { sessionsRouter } from "./routes/sessions.ruta.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const httpServer = app.listen(port, () => console.log(`Servidor funcionando en el puerto ${port}`));

const io = new Server(httpServer);

connectDB();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

app.use(
    session({
        store: MongoStore.create({
            ttl: 4000,
            mongoUrl: config.mongo.url,
        }),
        secret: config.server.secretSession,
        resave: true,
        saveUninitialized: true,
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(viewsRouter);
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/sessions", sessionsRouter);

io.on("connection", async(socket) => {
    console.log("Cliente Conectado");
    const productos = await productosService.getProductos();
    socket.emit("productosArray", productos);

    socket.on("agregarProducto", async(dataProducto) => {
        const result = await productosService.crearProducto(dataProducto);
        const productos = await productosService.getProductos();
        io.emit("productosArray", productos);
    });
});