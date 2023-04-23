import { getAreas } from "../../../databases/sql/sql_querys_main.js";


export const get_register = async(req,res)=> {
    try {
        const areas = await getAreas();
        res.render('register_index', {areas});
    } catch (error) {
        console.log(error);
    };
};
