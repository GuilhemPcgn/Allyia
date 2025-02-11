const mockUsers = [
    {
        user_id: 1,
        firstname: "Sophie",
        lastname: "Martin",
        email: "sophie.martin@email.com",
        phone: "0612345678",
        adress: "123 rue de Paris, 75001 Paris",
        birthdate: "1990-05-15",
        sex: "Femme",
        role: "patient",
        password_hash: "$2a$10$XYZ...", // Hash simulé
        created_at: "2024-01-01T10:00:00Z"
    },
    {
        user_id: 2,
        firstname: "Jean",
        lastname: "Dupont",
        email: "jean.dupont@email.com",
        phone: "0687654321",
        adress: "45 avenue des Champs-Élysées, 75008 Paris",
        birthdate: "1985-08-22",
        sex: "Homme",
        role: "medecin",
        password_hash: "$2a$10$ABC...", // Hash simulé
        created_at: "2024-01-02T14:30:00Z"
    }
];

const mockDrugs = [
    {
        drug_id: 1,
        name: "Doliprane",
        dosage: "1000mg",
        vidal_code: "VID123456",
        description: "Paracétamol pour le traitement de la douleur et de la fièvre",
        side_effects: "Réactions allergiques, troubles hépatiques"
    },
    {
        drug_id: 2,
        name: "Amoxicilline",
        dosage: "500mg",
        vidal_code: "VID789012",
        description: "Antibiotique de la famille des bêta-lactamines",
        side_effects: "Diarrhée, nausées, réactions allergiques"
    }
];

const mockOrdinances = [
    {
        ordinance_id: 1,
        user_id: 1,
        date: "2024-03-01",
        doctor: "Dr. Jean Dupont",
        scan_file: "ordonnance_1.pdf",
        qr_code: "QR12345",
        text_analysis: "Traitement pour infection respiratoire",
        date_analysis: "2024-03-01T10:30:00Z"
    }
];

const mockPrescriptions = [
    {
        prescription_id: 1,
        ordinance_id: 1,
        drug_id: 1,
        posology: "1 comprimé 3 fois par jour",
        time_lenght: "7 jours"
    },
    {
        prescription_id: 2,
        ordinance_id: 1,
        drug_id: 2,
        posology: "1 gélule matin et soir",
        time_lenght: "5 jours"
    }
];

const mockDrugIntakes = [
    {
        intake_id: 1,
        user_id: 1,
        drug_id: 1,
        intake_date: "2024-03-01T08:00:00Z",
        status: "pris"
    },
    {
        intake_id: 2,
        user_id: 1,
        drug_id: 1,
        intake_date: "2024-03-01T14:00:00Z",
        status: "a prendre"
    }
];

module.exports = {
    mockUsers,
    mockDrugs,
    mockOrdinances,
    mockPrescriptions,
    mockDrugIntakes
};