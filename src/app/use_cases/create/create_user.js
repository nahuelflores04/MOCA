import { getConnection } from "../../../infrastructure/databases/sql/sql_connection.js";

export const register = async (req, res) => {
  try {
    const pool = await getConnection();

    //Query de inserción en tabla users

    //Mail usando EmailServices.js
  } catch (error) {
    console.log(error);
  }
};
