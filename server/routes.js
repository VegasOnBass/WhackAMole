const express = require('express');
const router = express.Router();
const Score = require('./models.js');

router.get('/scores', async (req, res, next) => {
  const scores = await Score.find()
                            .sort('-score')                            
    
  res.send(scores)

  /* Score.find({})
    .then((data) => res.json(data))
    .catch(next); */
});

router.post('/scores', (req, res, next) => {
  if (req.body.name) {
    Score.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

module.exports = router;
