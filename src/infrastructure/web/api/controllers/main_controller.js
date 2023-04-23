import { generateHashPassword } from '../../../../domain/services/EncryptedPassService.js';

export const data_login = async function (req, res) {
  let user;
  console.log(req.user);
  if (req.isAuthenticated()) {
    user = {
      user_id: req.user.user_id,
      username: req.user.username,
      password: req.user.password,
      area: req.user.user_area,
      rol: req.user.user_rol,
      first_login: req.user.first_login,
      isloggedin: req.isAuthenticated(),
    };
  }
  return user;
};

export const auth_pass = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      let data_user = req.user;
      if (data_user.first_login == 1) { //=> Si el usuario es logueado por primera vez, podremos setear una password nueva privada.
        res.render("moca_change_pass", { data_user });
      } else {
        switch (data_user.user_rol) {
          case 0:
            console.log(data_user)
            res.render("moca_admin_index", {data_user});
            break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const login_error = async (req, res) => {
  try {
    //Acá podemos traer algún dato para mostrar en el error.
    res.render("moca_login_error");
  } catch (error) {
    console.log(error);
  }
};

//-----------------------TEST---------------------------//

// async function createTestUser(){
//   const pool = await getConnection()
//   let new_pass = 'user'
//   let encrypted_pass = await generateHashPassword(new_pass)
//   pool.request()
//   .input("user_id", sql.Int, 0)
//   .input("username", sql.VarChar, 'testuser')
//   .input("password", sql.VarChar, encrypted_pass)
//   .query(`insert into expensePro_users (user_id, username, password, user_rol, user_area, first_login, active, inserted_date, updated_at, updated_by)
//         values (@user_id, @username, @password, 1, 0, 1, 1, getdate(), getdate(), 1)`)
//   console.log('Creado')
// };
//createTestUser()

//Funcion para modificar legajos y setear clave encriptada. (TEST)

// async function modify_pass(){
//   const pool = await getConnection();

//   let id = '1860'
//   let new_pass = id.toString()
//   let encrypted_pass = await generateHashPassword(new_pass)
//   pool.request().query(`update moca_users set password = '${encrypted_pass}' where user_id = ${id}`)
//   console.log('Modificado');
// };
// modify_pass();
