const { User } = require('../indexdatabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isEmailValid=(email)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}


const getAllUsers= async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } 
    
    catch (err) {
        res.status(404).send(err);
    }
},
    getOneUser= async (req, res) => {
    try {
        const oneUser = await User.findByPk(req.params.id);
        res.status(200).send(oneUser);
    } catch (err) {
        res.status(404).send(err);
    }
},
updateUser = async (req, res) => {
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

deleteUser= async (req, res) => {
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
},

   addUser = async (req, res)=>{
    const { firstName, email, password, role  } = req.body
    try {
        if(isEmailValid(email)) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newuser= await User.create({
            firstName,
            email, 
            password: hashedPassword,
            role
        })
         const token = jwt.sign({ userId: newuser.id, role: newuser.role, email:newuser.email, address: newuser.address, firstName:newuser.firstName,lastname:newuser.lastname }, 'this is my secret key for our first senior project', {
        expiresIn: 3600,
        })

        res.status(201).json({token})

        }
        
        else {
            res.send("Please enter a valid email")
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("error adding a user")
    }
},

   loginUser = async (req,res) => {
    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role, email:user.email, address: user.address, firstName:user.firstName,lastname:user.lastname }, 'this is my secret key for our first senior project', {
        expiresIn: 3600,
        })
       
        res.status(200).json({ token });
        } 
      catch (error) {
        res.status(500).json({ error: 'Login failed' });
        }
        }


module.exports = {
    
getAllUsers,
getOneUser,
 updateUser,
 deleteUser,
 addUser ,
   loginUser
};
