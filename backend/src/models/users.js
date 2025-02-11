import { Model, DataTypes } from 'sequelize';

class users extends Model {}

users.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        phone: DataTypes.STRING(20),
        adress: DataTypes.STRING(255),
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        sex: {
            type: DataTypes.ENUM('Man', 'Woman', 'Other'),
                allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Patient', 'Doctor', 'Pharmacist'),
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        timestamps: false,
        tableName: 'Users',
    });

users.hasMany(ordinance, { foreignKey: 'user_id' });
users.hasMany(drug_intake, { foreignKey: 'user_id' });
users.hasMany(authentification, { foreignKey: 'user_id' });

export default users;