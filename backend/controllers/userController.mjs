import { mockUsers } from '../data/mockData.js';

const userController = {
getAllUsers: (req, res) => {
    res.json(mockUsers);
},

getUserById: (req, res) => {
    const user = mockUsers.find(u => u.user_id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
},
};

export default userController;