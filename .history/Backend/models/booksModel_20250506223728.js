import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Images = sequelize.define('Books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false, 
  },
  author:{
    type:DataTypes.STRING,
    allowNull:false, 
  },

}, {
  tableName: 'books',
  timestamps: false 
});

export default Books;
