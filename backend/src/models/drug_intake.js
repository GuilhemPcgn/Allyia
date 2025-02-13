import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import users from './Users.js';
import drugs from './drugs.js';

class drug_intake extends Model {}

drug_intake.init(
    {
        intake_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        drug_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        intake_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('To take', 'Taked', 'Forgotten'),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        tableName: 'drug_intake',
    });

    drug_intake.belongsTo(users, { foreignKey: 'user_id' });
    drug_intake.belongsTo(drugs, { foreignKey: 'drug_id' });

    export default drug_intake;