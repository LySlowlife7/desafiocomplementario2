import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/signup", passport.authenticate("signupLocalStrategy",{
    failureRedirect: "/api/sessions/failsignup"
}) ,(req, res) => {
    res.redirect("/login");
});

router.get("/failsignup", (req, res) => {
    res.render("REGISTRO", {error: "No se logró registrar al usuario"});
});

router.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect: "/api/sessions/faillogin"
}) ,(req, res) => {
    res.redirect("/profile");
});

router.get("/faillogin", (req, res) => {
    res.render("INICIO DE SESIÓN", {error: "No se logró iniciar la sesión del usuario"});
});

export { router as sessionsRouter };