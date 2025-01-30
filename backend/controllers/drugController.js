import { mockDrugs, mockDrugIntakes } from '../data/mockData';

exports.getAllDrugs = (req, res) => {
    res.json(mockDrugs);
};

exports.getDrugById = (req, res) => {
    const drug = mockDrugIntakes.find(d => d.drug_id === parseInt(req.params.id));
    if (!drug) {
        return res.status(404).json({ message: "Médicament non trouvé" });
    }
    res.json(drug);
}

exports.getUserDrugIntakes = (req, res) => {
    const userIntakes = mockDrugIntakes.filter (
        di => di.user_id === parseInt(req.params.userId)
    );

    const intakesWithDetails = userIntakes.map(intake => ({
        ...intake,
        drug: mockDrugs.find(d => d.drug_id === intake.drug_id)
    }));

    res.json(intakesWithDetails);
};