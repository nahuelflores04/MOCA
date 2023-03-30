import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import { engine } from "express-handlebars";

const app = express()

//Set middlewars, statics, use, etc


const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));
app.use(cors());

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