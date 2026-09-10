const createUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const user = {
      name: req.body.name,
      email: req.body.email,
      image: req.file.filename,
    };


    res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = createUser