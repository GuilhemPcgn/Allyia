import { Model, DataTypes } from 'sequelize';

class drugs extends Model {}

drugs.init(
    {
        drug_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dosage: DataTypes.STRING(50),
        vidal_code: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        side_effects: DataTypes.TEXT,
    }, {
        sequelize,
        timestamps: false,
        tableName: 'drugs',
    });

drugs.hasMany(prescription, { foreignKey: 'drug_id' });
drugs.hasMany(drug_intake, { foreignKey: 'drug_id' });

export default drugs;