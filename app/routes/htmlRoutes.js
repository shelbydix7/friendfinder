import express from 'express';
const router = express.Router();

let matched = false;

router.get('/', (req, res) => {
  res.render('home');
});

export const questions = [
  {
    num: 1,
    question: 'Your mind is always buzzing with unexplored ideas and plans.'
  },
  {
    num: 2,
    question:
      'Generally speaking, you rely more on your experience than your imagination.'
  },
  {
    num: 3,
    question:
      'You find it easy to stay relaxed and focused even when there is some pressure.'
  },
  {
    num: 4,
    question: 'You rarely do something just out of sheer curiosity.'
  },
  {
    num: 5,
    question: 'People can rarely upset you.'
  },
  {
    num: 6,
    question:
      'It is often difficult for you to relate to other people’s feelings.'
  },
  {
    num: 7,
    question:
      'In a discussion, truth should be more important than people’s sensitivities.'
  },
  {
    num: 8,
    question: 'You rarely get carried away by fantasies and ideas.'
  },
  {
    num: 9,
    question:
      'You think that everyone’s views should be respected regardless of whether they are supported by facts or not.'
  },
  {
    num: 10,
    question:
      'You feel more energetic after spending time with a group of people.'
  }
];

router.get('/survey', (req, res) => {
  res.render('survey', {
    questions,
    matched: matched,
    error: req.flash('error')
  });
});

export default router;


