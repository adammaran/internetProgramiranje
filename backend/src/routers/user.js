const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users/create', async (req, res) => {
    if (await User.findOne({username: req.body.username})) {
        return res.status(400).send('username');
    }
      
    if (await User.findOne({ email: req.body.email })) { 
        return res.status(400).send('email');
    }
    
    const user = new User(req.body);
    
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try { 
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/users/current', auth, async (req, res) => {
    try {
        const user = await User.findById(req.body._id);
        user.username = req.body.username;
        user.email = req.body.email;

        await user.save();
        res.send(user);
    } catch (e) {
        res.sendStatus(400);
    }
});
    
router.delete('/users/current', auth, async (req, res) => {
    try {
        await req.user.remove();
        
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;