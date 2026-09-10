const WebUser = require("../models/User");

const createUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user = await WebUser.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      countryCode: req.body.countryCode,
      contact: req.body.contact,
      address: req.body.address,
      pinCode: req.body.pinCode,
      city: req.body.city,
      country: req.body.country,
      notes: req.body.notes,
      LiveUrl: req.body.LiveImageurl,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.log("Create User Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => { 
  try { 
    const users = await WebUser.find(); 
    res.status(200).json({ message: "Users fetched successfully", users, });
   } catch (error) { 
    console.log("Get Users Error:", error); 
    res.status(500).json({ message: error.message, }); 
  } };


module.exports = {
  createUser,
  getUsers,
};