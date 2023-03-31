import { getConnection } from "../../../databases/sql/sql_connection.js";

export const login = async(req,res)=> {
    try {

        const pool = await getConnection();
        let data = req.body
        res.json(data);
    } catch (error) {
        console.log(error)//=> Modularizar vistas de errores hbs
    };
};