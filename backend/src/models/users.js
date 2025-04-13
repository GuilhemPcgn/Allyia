import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';


class User extends Model {
    static async hashPassword(password) {
        return bcrypt.hash(password, 12);
    }

    async verifyPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

User.init({
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            if (user.changed('password_hash')) {
                user.password_hash = await User.hashPassword(user.password_hash);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password_hash')) {
                user.password_hash = await User.hashPassword(user.password_hash);
            }
        }
    }
});

export default User;