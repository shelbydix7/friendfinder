
import express from 'express';
const router = express.Router();
import axios from 'axios';
import { addFriend, getFriends } from '../database/friends';
import { questions } from './htmlRoutes';

const bestMatch = function(userScores, friends) {
  const results = [];
  //iterating over friends API
  friends.forEach((friend, index) => {
    //converting scores into numbers
    friend.scores = friend.scores.map(num => {
      return parseInt(num);
    });
    //calculating the difference between corresponing answers
    let difference = [];
    userScores.forEach((num, index) => {
      difference.push(num - friend.scores[index]);
    });
    //converting negative numbers into positive
    difference = difference
      .map(num => {
        if (num < 0) {
          return num * -1;
        }
        return num;
      })
      //calculating compatibility score by adding the numbers together (the smallest number wins)
      .reduce((acc, num) => {
        return acc + num;
      });
    results.push(difference);
  });

  //smallest number in the results array
  let smallest = Math.min.apply(Math, results);
  //index of the friend with the smallest score
  let matchIndex = results.indexOf(smallest);
  //match
  const match = friends[matchIndex];
  console.log('match: ', match);
  return match;
};

router.get('/friends', (req, res) => {
  getFriends(req, res);
});

router.post('/friends', (req, res) => {
  let { name, avatar, scores } = req.body;
  const user = { name, avatar, scores };
  Joi.validate({ name, scores }, schema, err => {
    if (!err) {
      addFriend(name, avatar, scores);
      // Get Best Match
      const rootUrl = req.protocol + '://' + req.get('host');
      axios
        .get(rootUrl + '/api/friends')
        .then(response => {
          const friendsApi = response.data;
          scores = scores.map(num => {
            return parseInt(num);
          });
          //removing the last added friend (user) from the API array
          friendsApi.splice(-1, 1);
          console.log('user:', user);
          let match = bestMatch(scores, friendsApi);
          res.render('survey', { questions, matched: true, match });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      req.flash('error', err.message);
      res.redirect('/survey');
    }
  });
});

export default router;