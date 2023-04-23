import { generateHashPassword } from "../../../domain/services/EncryptedPassService.js";
import { getConnection } from "./sql_connection.js";


export const getUserById = async(legajo)=>{
    try {
        const pool = await getConnection()
        const data = (await pool.request().query(`select * from moca_users where user_id = ${legajo}`)).recordset[0]
        return data
    } catch (error) {
        console.log(error)
        return null;
    };
};


export const getUserByUsername = async(username) => {
    const pool = await getConnection();
    const user = (await pool.request().query(`select * from moca_users where username = '${username}'`)).recordset[0];
    return user;
};


export const blockUserById = async(legajo)=>{
    try {
        const pool = await getConnection();
        await pool.request.query(`update moca_users set active = 0 where user_id = ${legajo}`)
        return
    } catch (error) {
        console.log(error)
    };
};


export const updatePassword = async(legajo, new_pass)=>{
    try {
        const pool = await getConnection();
        let encrypted_pass = await generateHashPassword(new_pass);
        await pool.request().query(`update moca_users set password = '${encrypted_pass}', first_login = 0 where user_id = ${legajo}`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };
};


export const getAreas = async() => {
    try {
        const pool = await getConnection();
        const areas = (await pool.request().query(`select area_id, area_description from moca_area_type`)).recordset
        return areas
    } catch (error) {
        console.log(error);
    };
};
