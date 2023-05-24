// para conectarnos a una base de datos, primero debes crear una instancia
// de Sequelize
const { Sequelize } = require("sequelize");
require('dotenv').config();

// en la creación de la instancia pasamos los parámetros de configuración
const db = new Sequelize({
  database: process.env.DB_NAME, // nombre de la base de datos en donde realizarás tu conexión 
  username: process.env.DB_USERNAME, // nombre del usuario propietario de la base de datos
  host: process.env.DB_HOST, // el host donde se encuentra tu base de datos
  port: process.env.DB_PORT, // el puerto de conexión a tu base de datos (puede ser igual 5433)
  password: process.env.DB_PASSWORD, // la contraseña del usuario en postgres
  dialect: "postgres", // el dialecto de la base de datos que estamos usando
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false}},
});

// finalmente exportamos la instancia hecha en la variable db
module.exports = db;



//postgres://fede_alvarez:7y6i2oUMvYDiK06pvrpuMWC5HVeh9qDu@ dpg-chmje8l269vfed40jo3g-a.oregon-postgres.render.com /crud_basico


// ESTE ES EL LINK DE RENDER PARA EL HOST //
// dpg-chmje8l269vfed40jo3g-a.oregon-postgres.render.com //