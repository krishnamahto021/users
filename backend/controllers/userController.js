const User = require("../models/userModel");
const { ObjectId } = require("mongodb");
module.exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  try {
    const skip = (page - 1) * limit;
    const users = await User.find({}).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        totalPages,
        currentPage: page,
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

module.exports.createUser = async (req, res) => {
  const { first_name, last_name, email, gender, avatar, domain, available } =
    req.body;
  try {
    if (!first_name || !last_name || !email || !gender || !domain) {
      return res.status(400).json({
        success: false,
        message: "Please fill out all the fields",
      });
    }
    const randomNumber = Math.floor(Math.random() * (99999 - 999 + 1)) + 999;
    const newUser = await User.create({
      id: randomNumber,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

module.exports.getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    let user;
    if (ObjectId.isValid(id)) {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ id });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user" });
  }
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  let user;

  try {
    if (ObjectId.isValid(id)) {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ id });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    Object.keys(updateData).forEach((key) => {
      if (key in user) {
        user[key] = updateData[key];
      }
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findOneAndDelete({ id: id });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

module.exports.filterUsers = async (req, res) => {
  try {
    const { domain, gender, availability } = req.query;

    let query = {};

    if (domain) {
      query.domain = domain;
    }
    if (gender) {
      query.gender = gender;
    }
    if (availability !== undefined) {
      query.availability = availability === "true";
    }

    const users = await User.find(query);

    res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.error("Error filtering users:", error);
    res.status(500).json({ success: false, message: "Failed to filter users" });
  }
};

module.exports.getDomains = async (req, res) => {
  try {
    const uniqueDomains = await User.distinct("domain", { available: true });
    res.status(200).json({
      success: true,
      uniqueDomains,
      message: "Successful fetching of the domains",
    });
  } catch (error) {
    console.error("Error in finding domain", error);
    res.status(500).json({ success: false, message: "Failed to filter users" });
  }
};

module.exports.getUsersBasedOnDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    const users = await User.find({ domain });
    if (!users) {
      res.status(400).send({
        success: false,
        message: "No such users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users fetched ",
      users,
    });
  } catch (error) {
    console.error("Error getting users based on domains :", error);
    res.status(500).json({ success: false, message: "Failed to filter users" });
  }
};

module.exports.searchUser = async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i"); // Case-insensitive regex pattern

    const users = await User.find({
      $or: [{ first_name: regex }, { last_name: regex }],
    }).limit(20);

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error searching for users:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to search for users" });
  }
};
