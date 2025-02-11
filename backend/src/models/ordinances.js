import { Model, DataTypes } from 'sequelize';

class ordinances extends Model {}

ordinances.init(
    {
        ordinance_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        doctor: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        scan_file: DataTypes.TEXT,
        qr_code: DataTypes.TEXT,
        text_analysis: DataTypes.TEXT,
        date_analysis: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        timestamps: false,
        tablename: 'ordinances',
    });

    ordinances.belongsTo(users, { foreignKey: 'user_id' });
    ordinances.hasmany(users, { foreignKey: 'user_id' });

export default ordinances;