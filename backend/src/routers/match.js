const express = require('express');
const Team = require('../models/team');
const auth = require('../middleware/auth');
const Match = require('../models/match');
const router = new express.Router();

router.post('/match/add', auth, async (req, res) => {   
    console.log(req.body); 
    const match = new Match(req.body);
    console.log(match);
    try {
        await match.save();
        res.status(201).send(match);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.get('/match', async (req, res) => {
    try {
        const matches = await Match.find();

        res.status(200).send(matches);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/match/delete/:id', auth, async (req, res) => {
    try {
        const match = await Match.findOneAndDelete({ _id: req.params.id });

        if (!match) 
            res.status(404).send();

        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;