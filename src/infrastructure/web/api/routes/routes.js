import { Router } from "express";
import passport from 'passport'
import session from 'express-session';
import { Strategy } from "passport-local";
import { auth_pass, login_error } from "../controllers/main_controller.js";

const LocalStrategy = Strategy;
export const router = Router();

import { data_login } from "../controllers/main_controller.js";
import { get_register } from "../controllers/register_controller.js";
import { register } from "../../../../app/use_cases/create/create_user.js";
import { change_pass } from "../../../../app/use_cases/update/update_user.js";
import { verifyPass } from "../../../../domain/services/EncryptedPassService.js";
import { blockUserById, getUserById, getUserByUsername } from "../../../databases/sql/sql_querys_main.js";


passport.use(new LocalStrategy(
    async function (legajo, password, done) {
        const data = await getUserById(legajo)
        //console.log(data)
        if (!data) {
            session.userStatus = 'El usuario no existe';
            return done(null, false);
        } else {
            if (data.active === 1) {
                const match = await verifyPass(data, password)
                if (!match) {
                    if (!session.contador) {
                        session.contador = 1;
                        session.userStatus = 'Contraseña incorrecta';
                        return done(null, false);
                    } else {
                        session.userStatus = 'Contraseña incorrecta';
                        session.contador++;
                        if (session.contador >= 6) {
                            try {
                                await blockUserById(legajo)
                                session.contador = 0;
                            } catch (error) {
                                res.redirect(`/login`);
                            }
                        }
                        return done(null, false);
                    }}
                }
            else {
                session.userStatus = 'USUARIO BLOQUEADO';
                return done(null, false);
            };
        };
        session.userStatus = null;
        session.contador = null;
        return done(null, data);  //Envio array con los datos del usuario
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.username);
});


passport.deserializeUser(async (username, done) => {
    try {
        const user = await getUserByUsername(username);
        done(null, user);
    } catch (err) {
        done(err, null);
    };
});


router.use(passport.initialize());
router.use(passport.session());

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

export async function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
};}

router.get('/login', async (req, res) => {
    const user = await data_login(req, res);
    let usuario;
    if (user) { usuario = user.username };
    let status = session.userStatus;
    session.userStatus = null;
    res.json(user);
}); 


//Rutas pertinentes a login, register y change_pass con first login activo
router.post('/login', passport.authenticate('local', { successRedirect: 'http://localhost:5000/auth_pass', failureRedirect: 'http://localhost:5000/login_error'}));
router.get('/auth_pass', isAuth, auth_pass);
router.post('/change_pass', isAuth, change_pass);
router.get('/register', get_register);
router.post('/register', register);
router.get('/login_error', login_error);

export default router;