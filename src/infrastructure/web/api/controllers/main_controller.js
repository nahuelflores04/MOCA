import { getConnection } from "../../../databases/sql/sql_connection.js";

export const data_login = async function (req, res) {
    let user;
    if (req.isAuthenticated()) {
      user = {
        user_id : req.user.user_id,
        username: req.user.username,
        password: req.user.password,
        area: req.user.user_area,
        rol: req.user.user_rol,
        first_login: req.user.first_login,
        isloggedin: req.isAuthenticated()
      }
    };
    return user;
};


export const auth_pass = async(req,res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.log(error);
    };
};


export const login_error = async(req, res) => {
    try {
        res.json('Login error');
    } catch (error) {
        console.log(error);
    };
};