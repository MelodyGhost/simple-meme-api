const express = require('express');
const Meme = require('../model/Memes');
const { memeUploader } = require('../utilities/memeUploader');

const memeRoute = express.Router();

const getMemes = async (req, res, next) => {
  try {
    const allMemes = await Meme.find({ active: true });
    res.status(200).send({
      status: 'success',
      results: allMemes.length,
      data: allMemes,
    });
  } catch (err) {
    next(new Error('There is an error fetching meme'));
  }
};

const addMeme = async (req, res, next) => {
  const { url, uploaded } = req.body;

  try {
    const newMeme = await Meme.create({ url, uploaded });

    res.status(201).send({
      status: 'success',
      data: {
        meme: newMeme,
      },
    });
  } catch (err) {
    next(new Error('There is an error adding meme'));
  }
};

const deleteMeme = async (req, res, next) => {
  try {
    const deleted = await Meme.findByIdAndUpdate(req.params.id, {
      active: false,
    });

    res.status(202).send({
      status: 'success',
      data: deleted,
    });
  } catch (err) {
    next(new Error('Error deleting file'));
  }
};

const getLast7DaysStats = async (req, res, next) => {
  const curDate = new Date();
  curDate.setDate(curDate.getDate() - 7);
  const last7DaysString = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
  const stats = await Meme.aggregate([
    {
      $match: { created: { $gt: new Date(last7DaysString) } },
    },
    {
      $group: {
        _id: {
          year: { $year: '$created' },
          month: { $month: '$created' },
          day: { $dayOfMonth: '$created' },
        },
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  res.send(stats);
};

memeRoute.route('/').get(getMemes).post(memeUploader, addMeme);
memeRoute.delete('/:id', deleteMeme);
memeRoute.get('/stats', getLast7DaysStats);

module.exports = memeRoute;
