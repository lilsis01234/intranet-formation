const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');
const Formation = require('./formation'); // Assurez-vous d'importer Formation
const Module = require('./Module'); // Assurez-vous d'importer Module

class Seance extends Model {}

Seance.init(
    {
    date: {
      type: DataTypes.DATE,
    },
    heureStart: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    heureEnd: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    formation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Formation,
        key: 'id',
      },
    },
    module: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Module,
        key: 'id',
      },
    },
    nombreDePlaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Seance', 
  }
);

Seance.belongsTo(Formation, {
  foreignKey: 'formation',
  onDelete: 'CASCADE',
});

Seance.belongsTo(Module, {
  foreignKey: 'module',
  onDelete: 'CASCADE',
});

module.exports = Seance;