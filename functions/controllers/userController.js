const functions = require("firebase-functions");
const fetch = require('node-fetch');

const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await fetch(`https://bio.torre.co/api/bios/${username}`, {
      method: 'GET',
    });

    const data = await user.json();

    res.status(200).json(data);
  } catch (err) {
    functions.logger.info('Error', err);
    res.status(500).json(err.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await fetch('https://search.torre.co/people/_search/?size=25', {
      method: 'POST',
    });

    const data = await users.json();

    res.status(200).json(data);
  } catch (err) {
    functions.logger.info('Error', err);
    res.status(500).json(err.message);
  }
}

module.exports = { getUser, getUsers };