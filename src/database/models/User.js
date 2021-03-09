module.exports = (sequelize, dataTypes) => {
    const alias = 'User';
    const cols = {
      id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: dataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      password: {
        type: dataTypes.STRING(150),
        allowNull: false
      },
      name:{
        type: dataTypes.STRING(100)
      },
      surname:{
        type: dataTypes.STRING(100)
      },
      telephone: {
        type: dataTypes.STRING(100)
      },
      country: {
        type: dataTypes.STRING(100)
      }
    };
    const config = {
      tableName: 'users',
      timestamps: true,
      underscored: true
    };
    const User = sequelize.define(alias, cols, config);  
    
    User.associate = function(models) {
      
      User.belongsToMany(models.Prueba, {
        as: 'Prueba',
        through: 'usuarios_pruebas',
        foreignKey: 'usuario_id',
        otherKey: 'prueba_id',
        timestamps: true
      });
  
      User.hasMany(models.Inscripcion, {
        as: 'Inscripcion',
        foreignKey: 'usuario_id'
      });
  
    };
    
    return User;
  }