const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.DATEONLY, // string or date?
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true, // por verse
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      createInDatabase: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      background_image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      createdAt: false, //'created',
      updatedAt: false,
    }
  );
};

// ["PC","PlayStation 5", "PlayStation 4", "Xbox One", "Xbox Series S/X", "Nintendo Switch","iOS","Android","Nintendo 3DS","name": "Nintendo DS",]
