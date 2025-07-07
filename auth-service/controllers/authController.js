const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    // Gestion des erreurs mongoose-unique-validator
    if (err.name === 'ValidationError' && err.errors.email?.kind === 'unique') {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};
