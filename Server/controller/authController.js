import userModels from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  console.log("inside authroute");
  try {
    console.log(req.body);
    const { Name, Email, Password, Phone, Address,roles } = req.body;

    // const{name,email,password,phone,address}={Name,Email,Password,Phone,Address};
    const name = Name;
    const email = Email;
    const password = Password;
    const phone = Phone;
    const address = Address;
    const role= (roles==="buyer"?0:1)

    console.log(name);
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    //existing user
    const existinguser = await userModels.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }
    // creating account

    const user = new userModels({
      name,
      email,
      password,
      phone,
      address,
      role,
    }).save();
    return res.status(201).send({
      status: true,
      message: "registraion successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "fail in registraion",
      message,
    });
  }
};

export const loginController = async (req, res) => {
  console.log("inside authroute_login");
  try {
    const { userId, Password } = req.body;

    // const{name,email,password,phone,address}={Name,Email,Password,Phone,Address};

    const email = userId;
    const password = Password;

    console.log(email);

    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    //existing user

    const existinguser = await userModels.findOne({ email });
    console.log(existinguser);
    const token = await JWT.sign(
      { _id: existinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    if (existinguser) {
      const result = req.body.Password === existinguser.password;
      if (result) {
        return res.status(200).send({
          message: "successfully login",
          existinguser,
          token,
          success: true,
        });
      } else {
        return res.status(400).send({ message: "password doesn't match" });
      }
    } else {
      return res.status(400).send({ message: "invalid user id or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "fail to login",
      message,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    console.log(req.params);
    const userId = req.params.id; // Get user ID from request parameters
    const { Name, Email, Phone, Address } = req.body;

    const user = await userModels.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields
    if (Name) user.name = Name;
    if (Email) user.email = Email;

    if (Phone) user.phone = Phone;
    if (Address) user.address = Address;

    // Save updated user
    await user.save();

    // Send response
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      }, // Include updated token if generated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    // console.log(req.params);
    const _id = req.params.id;
    // console.log(_id);
    const user = await userModels.findById(_id);
    if (!user) {
      return null; // User not found
    }
    return res.status(200).send({
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(400).send({ message: "user not found" });
  }
};

export const testController = (req, res) => {
  res.status(200).send("protected route");
};
