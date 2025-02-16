import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import users from './Users.js';

class authentification extends Model {}

authentification.init(
    {
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
        refresh_token: DataTypes.TEXT,
        expires_at: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        tableName: 'authentification',
    });

    authentification.belongsTo(users, { foreignKey: 'user_id' });

    export default authentification; 