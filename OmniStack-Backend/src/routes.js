const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post('/teste', (request, response) => {
    return response.json("{'name': 'Teste'}");
});

routes.post('/devs', async (request, response) => {
    const { github_username, techs } = request.body;
    const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
    const { name = login, avatar_url, bio } = apiResponse.data;

    const techsArray = techs.split(',').map(tech => tech.trim());
/*
    const dev = await Dev.create({
        github_username: github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    });
*/
    console.log(apiResponse.data);
    console.log(name, avatar_url, bio);
    console.log(techsArray);
    return response.json(dev);
});


module.exports = routes;