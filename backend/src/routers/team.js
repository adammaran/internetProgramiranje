const express = require('express');
const Team = require('../models/team');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/teams/add', auth, async (req, res) => {
    const existing = await Team.findOne({ name: req.body.name });
    if (existing) 
       return res.status(400).send('Vec postoji tim sa takvim imenom');
    
    const team = new Team(req.body);

    try {
        await team.save();
        res.status(201).send(team);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find();

        res.status(200).send(teams);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/teams/edit', auth, async (req, res) => {
    const existing = await Team.findOne({ name: req.body.name });
    if (existing) 
       return res.status(400).send('Vec postoji tim sa takvim imenom');
       
    const team = await Team.findById(req.body._id);
    team.name = req.body.name;
    
    try {
        await team.save();
        res.status(200).send(team);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/teams/delete/:id', auth, async (req, res) => {
    try {
        const team = await Team.findOneAndDelete({ _id: req.params.id });

        if (!team) 
            res.status(404).send();

        await team.delete();

        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;