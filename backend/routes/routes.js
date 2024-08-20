const express = require('express');
const Company = require('../models/company');
const router = express.Router();

const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/isin/:isin', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const company = await Company.findOne({ where: { isin: req.params.isin } });
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (company) {
      await company.update(req.body);
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
