import express from 'express';


const router = express.Router();


// // Drugs
// router.get ('/', drugController.getAllDrugs);
// router.get('/id', drugController.getDrugsById);
// router.get('intakes/:userId', drugController.getUserDrugIntakes);

// // Ordinances
// router.get('/user/:userId', ordinanceController.getOrdinances);
// router.get('/:id', ordinanceController.getOrdinanceWithPrescrption);

// // Pharmacies
// router.get('/', [
//     query('lat').isFloat(),
//     query('lng').isFloat(),
//     query('radius').option().isInt({ min: 100, max: 50000 })
// ], pharmacieController.getPharmacies);

// router.get('/:id', pharmacieController.getPharmacieById);

// // Users
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);



export default router;


