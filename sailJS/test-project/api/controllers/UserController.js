/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action: method
  hi: (req, res) => {
    return res.send("Hi there");
  },
  bye: function (req, res) {
    return res.redirect("http://www.sayonara.com");
  },
};
