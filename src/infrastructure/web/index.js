import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import bodyParser from 'body-parser';
import { engine } from "express-handlebars";
import login_routes from './api/routes/routes.js'
import session from 'express-session';
import passport from 'passport';

const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const publicPath = path.join(__dirname, "../../public");

app.use(express.static(publicPath));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de sesión
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// Configuración de passport
app.use(passport.initialize());
app.use(passport.session());

//Enrutamientos
app.use(login_routes);

//Handlebars
app.set("views", path.join(__dirname, "../../views"));
app.engine(
  ".hbs",
  engine({
    helpers: {
      iff: function (a, operator, b, opts) {
        let bool = false;

        switch (operator) {
          case `===`:
            bool = a == b;
            break;
          case `>`:
            bool = a > b;
            break;
          case `<`:
            bool = a < b;
            break;
          default:
            bool = a == b;
        }
        if (bool) {
          return opts.fn(this);
        }
        return opts.inverse(this);
      },
    },

    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "/layouts"),
    partialsDir: path.join(app.get("views"), "/partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.get('/', (req,res)=>{ //=> Este get moverlo luego a routes.
    res.render('index')
});

export default app