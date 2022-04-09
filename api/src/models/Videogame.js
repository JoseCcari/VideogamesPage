const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },  
    releaseDate: {
      type : DataTypes.DATE, // string or date?
      allowNull:false
    },
    rating: {
      type : DataTypes.INTEGER,
      allowNull: false // por verse
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    }


  },
  {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};
