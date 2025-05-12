import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Images = sequelize.define('Images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  views: {
    type: DataTypes.STRING,  
    allowNull: false
  },
  timestamp: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  channelImage: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  channel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true  
  }
}, {
  tableName: 'images',
  timestamps: false 
});

export default Images;
