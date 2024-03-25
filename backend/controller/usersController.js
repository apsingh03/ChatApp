const db = require("../models");
const bcrypt = require("bcrypt");

// Tables
const Users = db.users;

const getAllUsers = async (req, res) => {
  const query = await Users.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).send({ msg: "List of all users", users: query });
};

const createUser = async (req, res) => {
  try {
    console.log("Req.body - ", req.body);
    const emailExistQuery = await Users.findOne({
      where: { email: req.body.email },
    });
    const usernameExistQuery = await Users.findOne({
      where: { username: req.body.username },
    });

    if (emailExistQuery) {
      if (emailExistQuery.email === req.body.email) {
        return res.status(200).send({ msg: "Email Already Exist" });
      }
    } else if (usernameExistQuery) {
      if (usernameExistQuery.username === req.body.username) {
        return res.status(200).send({ msg: "Username Already Exist" });
      }
    } else {
      const saltRounds = 10;

      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        const query = await Users.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          mobile: req.body.mobile,
          createdAt: Date.now(),
        });

        return res.status(200).send({ msg: "Sign Up Successful" });
      });
    }
  } catch (error) {
    console.log("createUser Error - ", error);
    return res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const emailExistQuery = await Users.findOne({
      where: { email: req.body.email },
    });

    if (emailExistQuery) {
      bcrypt.compare(
        req.body.password,
        emailExistQuery.password,
        function (err, result) {
          if (err) {
            return res.status(500).send({ msg: "Something went wrong" });
          }

          if (result) {
            const { id, username, email, createdAt } = emailExistQuery;
            const userObject = { id, username, email, createdAt };
            return res
              .status(200)
              .send({ msg: "Logged In Successfull", userObject: userObject });
          } else {
            return res.status(200).send({ msg: "Password Wrong" });
          }
        }
      );
    } else {
      return res.status(200).send({ msg: "User Doesn't Exist" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
