import { Router } from "express";
import { productosService } from "../persistence/index.js";

const router = Router();

router.get("/", async(req,res) => {
    const {limit=5, page=1} = req.query;
    const query = {};
    const options = {
        limit,
        page,
        lean:true
    };
    const result = await productosService.getProductosPaginate(query, options);
    const baseURL = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProductos = {
        status:"succes",
        payload:result.docs,
        totalPages:result.totalPages,
        prevLink:result.hasPrevPage ? `${baseURL.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink:result.hasNextPage ? baseURL.includes("page") ? baseURL.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseURL.concat(`?page=${result.nextPage}`) : null
    }
    console.log(dataProductos);
    res.render("home", dataProductos);
});

//RENDERIZACION DE LA RUTA DE SIGNUP
router.get("/signup", (req, res) => {
    res.render("signUp");
});

//RENDERIZACION DE LA RUTA DE LOGIN
router.get("/login", (req, res) => {
    res.render("logIn");
});

router.get("/realtime", (req, res) => {
    res.render("realtime");
});

router.get("/profile", (req, res) => {
    res.render("profile", { usuario:req.usuario});
});


export {router as viewsRouter}