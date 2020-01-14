const Dev = require('../models/Dev')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index (req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store (req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if(!dev) {
            const techsArray = parseStringAsArray(techs)
        
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            
            const { name, avatar_url, bio } = response.data
        
            // To save location
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray, 
                location
            })
        }

        return res.json(dev)
    },

    async update (req, res) {

    },

    async destroy (req, res) {
        
    }
}