import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    logging: false
});

// Test de la connexion a la DB
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie !');
    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données :', error);
    }
};

testConnection();

export default sequelize;