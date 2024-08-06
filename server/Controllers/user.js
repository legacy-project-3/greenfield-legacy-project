const { User } = require('../indexdatabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).send(users);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    getOneUser: async (req, res) => {
        try {
            const oneUser = await User.findByPk(req.params.id);
            res.status(200).send(oneUser);
        } catch (err) {
            res.status(404).send(err);
        }
    },
    addUser: async (req, res) => {
        try {
            const data = req.body;
            const user = new User(data);
            const salt = bcrypt.genSaltSync(10);
            const crypted = bcrypt.hashSync(data.password, salt);
            user.password = crypted;
            const saved = await user.save();
            res.status(200).send(saved);
        } catch (err) {
            res.status(405).send(err);
        }
    },
    loginUser: async (req, res) => {
        const { telmail, password } = req.body;
        
        try {
            const user = await User.findOne({ where: { telmail } });
            if (!user) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const token = jwt.sign({ userId: user.id, role: user.role }, 'blabla123', {
                expiresIn: '1h',
            });
    
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error logging in:', error); 
            res.status(500).json({ error: 'Login failed', details: error.message })
        }
    },
            
    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const user = await User.findByPk(id);
            if (user) {
                await user.update(data);
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (err) {
            res.status(404).send(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);
            if (user) {
                await user.destroy();
                res.status(200).send({ message: 'User deleted successfully' });
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (err) {
            res.status(404).send(err);
        }
    }
};
