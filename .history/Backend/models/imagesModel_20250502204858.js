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
    type: DataTypes.STRING,  // Keep as STRING to store formatted view count
    allowNull: false
  },
  timestamp: {
    type: DataTypes.STRING,  // Keep as STRING to store timestamp like "2 days ago"
    allowNull: false
  },
  channelImage: {
    type: DataTypes.STRING,
    allowNull: true  // Channel image can be nullable
  },
  channel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true  // Image URL can also be nullable
  }
}, {
  tableName: 'images',
  timestamps: false  // Disabling automatic timestamps as you’re using a custom timestamp
});

export default Images;
