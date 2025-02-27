const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Received request body:", req.body); // Étape 1 : Vérification des données reçues

        let user = await userModel.findOne({ email });
        if (user) {
            console.log("User already exists."); // Étape 2 : Vérification si l'utilisateur existe déjà
            return res.status(400).json({ error: "User with the given email already exists." });
        }

        if (!name || !email || !password) {
            console.log("Missing fields."); // Étape 3 : Vérification des champs requis
            return res.status(400).json({ error: "All fields are required." });
        }

        if (!validator.isEmail(email)) {
            console.log("Invalid email."); // Étape 4 : Validation de l'email
            return res.status(400).json({ error: "Email must be a valid email." });
        }

        if (!validator.isStrongPassword(password)) {
            console.log("Weak password."); // Étape 5 : Validation du mot de passe
            return res.status(400).json({ error: "The password must be a strong password." });
        }

        console.log("Creating user..."); // Étape 6 : Préparation pour la création
        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        console.log("Saving user to database..."); // Étape 7 : Sauvegarde dans la base de données
        await user.save();

        const token = createToken(user._id);

        console.log("User created successfully."); // Étape 8 : Utilisateur créé
        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.error("Error:", error); // Étape 9 : Capture des erreurs
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Invalid email or password");
        
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid email or password");

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });

    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId)

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) => {
    
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { name } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) return res.status(400).json("Utilisateur non trouvé");

        user.name = name;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, findUser, getUsers, updateUser };