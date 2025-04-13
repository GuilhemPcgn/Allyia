import User from './users.js';
import Drug from './drugs.js';
import Ordinance from './ordinances.js';
import Prescription from './prescription.js';
import DrugIntake from './drug_intake.js';
import Authentification from './authentification.js';


// Associations
User.hasMany(Ordinance, { foreignKey: 'user_id' });
Ordinance.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(DrugIntake, { foreignKey: 'user_id' });
DrugIntake.belongsTo(User, { foreignKey: 'user_id' });

Drug.hasMany(DrugIntake, { foreignKey: 'drug_id' });
DrugIntake.belongsTo(Drug, { foreignKey: 'drug_id' });

Ordinance.hasMany(Prescription, { foreignKey: 'ordinance_id' });
Prescription.belongsTo(Ordinance, { foreignKey: 'ordinance_id' });

Drug.hasMany(Prescription, { foreignKey: 'drug_id' });
Prescription.belongsTo(Drug, { foreignKey: 'drug_id' });

User.hasMany(Authentification, { foreignKey: 'user_id' });
Authentification.belongsTo(User, { foreignKey: 'user_id' });

export {
    User,
    Drug,
    Ordinance,
    Prescription,
    DrugIntake,
    Authentification
};