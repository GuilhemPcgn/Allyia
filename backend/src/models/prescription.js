import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import ordinances from './ordinances.js';
import drugs from './drugs.js';

class prescription extends Model {}

prescription.init(
    {
        prescription_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ordinance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        drug_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        posology: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        time_lenght: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        tableName: 'prescription'
    });

    prescription.belongsTo(ordinances, { foreignKey: 'ordinance_id' });
    prescription.belongsTo(drugs, { foreignKey: 'drug_id' });

    export default prescription;