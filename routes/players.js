const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const Player = require('../models/player')

//Getting all players
router.get('/', async (req, res) => {
    try{
        const players = await Player.find()
        res.json(players)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//Getting one player
router.get('/:id', getPlayer, (req, res) => {
    res.json(res.player)
})

//Creating one player 
router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        days: req.body.days,
        scores: req.body.scores,
        items: req.body.items
    })

    try {
        const newPlayer = await player.save()
        res.status(201).json(newPlayer)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//Updating one player
router.patch('/:id', getPlayer, async (req, res) => {
    if(req.body.name!=null){
        res.player.name=req.body.name
    }
    if(req.body.days!=null){
        res.player.days=req.body.days
    }
    if(req.body.scores!=null){
        res.player.scores=req.body.scores
    }
    if(req.body.items!=null){
        req.player.items=req.body.items
    }

    try {
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Deleting one player
router.delete('/:id', getPlayer, async (req, res) => {
    try {
        await res.player.remove()
        res.json({message: "Deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getPlayer(req, res, next){
    let player
    try {
        player = await Player.findById(req.params.id)
        if(player == null){
            return res.status(404).json({message: 'Cannot Find Player'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.player = player
    next()
}


module.exports = router
