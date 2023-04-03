import { Router } from "express";
import { getConnection } from "../../../databases/sql/sql_connection.js";
import passport from 'passport'
import bcrypt from "bcrypt";
import session from 'express-session';
import { Strategy } from "passport-local";
import { auth_pass, login_error } from "../controllers/main_controller.js";

const LocalStrategy = Strategy;
const router = Router()

//Crear BD y testear con tabla de usuarios.

passport.use(new LocalStrategy(
    async function (legajo, password, done) {
        console.log('Verificando usuario...')
        const pool = await getConnection();
        const datos_user = (await pool.request().query("select * from table_name where user_id =" + legajo)).recordset[0] //=> Tabla usuarios
        if (!datos_user) {
            session.userStatus = 'El usuario no existe';
            return done(null, false);
        } else {
            if (datos_user.active === 1) {
                const match = await verifyPass(datos_user, password)
                if (!match) {
                    if (!session.contador) {
                        session.contador = 1;
                        session.userStatus = 'Contraseña incorrecta'
                        return done(null, false);
                    } else {
                        session.userStatus = 'Contraseña incorrecta';
                        session.contador++;
                        if (session.contador >= 6) {
                            try {
                                pool.request().query("update table_name set active = 0 where user_id=" + legajo) //Active = 0 para user bloqueado
                                session.contador = 0;
                            } catch (error) {
                                res.redirect(`/login`);
                            }
                        }
                        return done(null, false);
                    }}
                }
            else {
                session.userStatus = 'USUARIO BLOQUEADO'
                return done(null, false);
            };
        };
        session.userStatus = null;
        session.contador = null;
        return done(null, datos_user);  //Envio array con los datos del usuario
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.username);
});

async function getUserByUsername(username) {
    const pool = await getConnection();
    const user = (await pool.request().query(`select * from rrhh_cba_users where username = '${username}'`)).recordset[0];
    return user;
}

passport.deserializeUser(async (username, done) => {
    try {
        const user = await getUserByUsername(username);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

router.use(passport.initialize());
router.use(passport.session());

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

async function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
};}


router.post('/login', passport.authenticate('local', { successRedirect: 'http://localhost:5000/auth_pass', failureRedirect: 'http://localhost:5000/login_error'}))
router.get('/auth_pass', isAuth, auth_pass);
router.get('/login_error', login_error);

export default router;