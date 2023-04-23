import { updatePassword } from "../../../infrastructure/databases/sql/sql_querys_main.js";

export const change_pass = async (req, res) => {
  try {
    let legajo = req.body.username;
    let new_pass = req.body.password1;
    let repeat_new_pass = req.body.password2;

    if (legajo == req.user.user_id) {
      if (new_pass == repeat_new_pass) {
        const result = await updatePassword(legajo, new_pass); //Las funciones de la BD las separamos de la lógica de negocio para seguir con la arq. hexagonal
        if (result) {
          res.render("index");
        } else {
          res.render("magna_expense_user_invalid_passwd");
        }
      } else {
        res.render("magna_expense_user_invalid_passwd"); //CREAR VISTA
      }
    } else {
      res.render("magna_expense_user_legajo_not_valid"); //CREAR VISTA
    }
  } catch (error) {
    console.log(error);
  }
};
