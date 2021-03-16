'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable ('usuarios', {
        id: {
            type: Sequelize.DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
          },
          email: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false,
            unique: true
          },
          contrasena: {
            type: Sequelize.DataTypes.STRING(150),
            allowNull: false
          },
          nombre:{
            type: Sequelize.DataTypes.STRING(100)
          },
          apellido:{
            type: Sequelize.DataTypes.STRING(100)
          },
          telefono: {
            type: Sequelize.DataTypes.STRING(100)
          },
          pais: {
            type: Sequelize.DataTypes.STRING(100)
          }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios')
  }
};