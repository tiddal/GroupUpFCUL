const express = require('express');
const teams = express.Router({ mergeParams: true });

const TeamController = require('../controllers/TeamController');

// GET /courses/L079/units/26719/projects/2019-2020/1/teams
teams.get('/', TeamController.index);

// GET /courses/L079/units/26719/projects/2019-2020/1/teams/T01
teams.get('/:team_number', TeamController.find);

// POST /courses/L079/units/26719/projects/2019-2020/1/teams
teams.post('/', TeamController.store);

// PUT /courses/L079/units/26719/projects/2019-2020/1/teams/T01
teams.put('/:team_number', TeamController.modify);

// DELETE /courses/L079/units/26719/projects/2019-2020/1/teams/T01
teams.delete('/:team_number', TeamController.remove);

module.exports = teams;
