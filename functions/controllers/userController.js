const functions = require("firebase-functions");
const fetch = require('node-fetch');

const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await fetch(`https://bio.torre.co/api/bios/${username}`, {
      method: 'GET',
    });

    const data = await user.json();

    const strengths = {
      master: [],
      expert: [],
      proficient: [],
    };

    data.strengths.forEach(strength => {
      if (strength.proficiency === 'master') {
        strengths.master.push(strength);
      }
      if (strength.proficiency === 'expert') {
        strengths.expert.push(strength);
      }
      if (strength.proficiency === 'proficient') {
        strengths.proficient.push(strength);
      }
    })

    res.status(200).json({
      person: data.person,
      interests: data.interests,
      experiences: data.experiences,
      awards: data.awards,
      jobs: data.jobs,
      projects: data.projects,
      publications: data.publications,
      education: data.education,
      opportunities: data.opportunities,
      languages: data.languages,
      strengths
    });
  } catch (err) {
    functions.logger.info('Error', err);
    res.status(500).json(err.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { next, previous } = req.query;
    const users = await fetch(`https://search.torre.co/people/_search/?size=25${next ? `&after=${next}` : ''}${previous ? `&before=${previous}` : ''}`, {
      method: 'POST',
    });

    const data = await users.json();

    const totalPages = data.total / 25;
    const currentPage = (data.offset / 25) + 1;

    res.status(200).json({
      totalPages,
      currentPage,
      users: data.results,
      next: data.pagination.next,
      previous: data.pagination.previous,
    });
  } catch (err) {
    functions.logger.info('Error', err);
    res.status(500).json(err.message);
  }
}

module.exports = { getUser, getUsers };