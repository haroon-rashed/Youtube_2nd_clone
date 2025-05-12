// models/booksModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Books = sequelize.define('Books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true, 
  }
}, {
  tableName: 'books',
  timestamps: false 
});

export default Books;