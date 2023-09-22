const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');
const Role= require ('../Modele/Role');

class Role2 extends Model {}

Role2.init(
  {
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role, // Référence au modèle Role
        key: 'id',
      },
    },
    titreRole2: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false, // Vous pouvez enlever le 'unique: true'
    },
  },
  {
    sequelize,
    modelName: 'Role2',
  }
);

Role.hasMany(Role2, {
  foreignKey: 'role', // La clé étrangère dans Role2
  onUpdate: 'CASCADE',
});

Role2.belongsTo(Role, {
  foreignKey: 'role', // La clé étrangère dans Role2
  onUpdate: 'CASCADE',
});

module.exports = Role2;