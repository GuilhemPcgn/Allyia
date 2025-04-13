import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const authentification = sequelize.define('Authentification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    provider: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.TEXT,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'authentification',
    timestamps: false,
});

export default authentification;
