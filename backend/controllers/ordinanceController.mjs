import { mockOrdinances, mockPrescriptions } from '../data/mockData.js';

const ordinanceController = {
getOrdinances: (req, res) => {
    const userOrdinances = mockOrdinances.filter(o => o.user_id === parseInt(req.params.userid));
    res.json(userOrdinances);
},

getOrdinanceWithPrescrption: (req, res) => {
    const ordinance = mockOrdinances.find(o => o.ordinance_id === parseInt(req.params.id));
    if (iordinance) {
        return res.status(404).json({ message: "Ordonnance non trouvée" });
    }

    const prescriptions = mockPrescriptions.filter(p => p.ordinance_id === ordinance.ordinance_id);
    res.json({
        ...ordinance,
        prescriptions 
    });
},
};

export default ordinanceController;