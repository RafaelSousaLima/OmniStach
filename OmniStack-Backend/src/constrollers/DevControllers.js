const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports =  {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            const dev = await Dev.create({
                github_username: github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
            return response.json({
                'message': `Usuário ${github_username} criado com sucesso.`,
                'object': dev
            });
        }
        return response.json(`Usuário ${github_username} já existe dentro da aplicação.`);
    },

    async update(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        const techsArray = parseStringAsArray(techs);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        let dev = await Dev.findOne({github_username});

        if (dev) {
           const devAtualizado = await Dev.updateOne(
               { 
                   'github_username' : github_username
                }, { 
                    'techs': techsArray, 'location': location 
                }
            );
            return response.json({
                'message': `Usuário ${github_username} atualizado com sucesso.`,
                'dev': devAtualizado
            });
        } else {
            return response.json(`Usuário ${github_username} não foi encontrado.`);
        }
    },

    async delete(request, response) {
        const { github_username } = request.query;
        let devEncontrado = await Dev.findOneAndRemove({ github_username : github_username });
        if (devEncontrado) {
            return response.json(`Usuário ${github_username} deletado com sucesso.`);
        }
        return response.json(`Usuário ${github_username} não foi encontrado.`);
    }

};