import express from 'express';
import drugController from '../controllers/drugController.js';
import medicamentController from '../controllers/medicamentController.js';
import ordinanceController from '../controllers/ordinanceController.js';
import pharmacieController from '../controllers/pharmacieController.js';
import userController from '../controllers/userController.js';
const router = express.Router();
const { body } = require('express-validator');
const { query } = require('express-validator');


// Drugs
router.get ('/', drugController.getAllDrugs);
router.get('/id', drugController.getDrugsById);
router.get('intakes/:userId', drugController.getUserDrugIntakes);

// Medicaments
router.get('/', medicamentController.getAllMedicaments);
router.get('/search', medicamentController.searchMedicaments);
router.get('/:id', medicamentController.getMedicamentById);

// Ordinances
router.get('/user/:userId', ordinanceController.getOrdinances);
router.get('/:id', ordinanceController.getOrdinanceWithPrescription);

// Pharmacies
router.get('/', [
    query('lat').isFloat(),
    query('lng').isFloat(),
    query('radius').option().isInt({ min: 100, max: 50000 })
], pharmacieController.getPharmacies);

router.get('/:id', pharmacieController.getPharmacieById);

// Users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);



export default router;


