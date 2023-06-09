import sql from 'mssql'

const dbSettings = {
    user: 'sa',
    password: 'Nahuelflores.10',
    server: 'localhost',
    database: 'METACODE_MOCA',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

export const getConnection = async(req,res) => {

    try {
        const pool = await sql.connect(dbSettings);
        return pool
    } catch (error) {
        console.log(error)//=> Vista hbs con error referenciando a BD
    };
};

export {sql};