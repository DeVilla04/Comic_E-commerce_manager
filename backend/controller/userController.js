import User from "../model/user.js";
import { generateToken } from "../middleware/authentication.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  // A user can only sign up as an admin if they are on the same network as the server
  // one way to prevent normal users from signing up as admins
  // if( req.ip !== "127.0.0.1"  ) {  // or whatever you want to allow to sign up as admin
  //     try {
  //         const hashedPassword = await bcrypt.hash(password, 10);
  //         const newUser = new user({
  //             name: name,
  //             email: email,
  //             password: hashedPassword,
  //             isAdmin: false,
  //         });
  //         const savedUser = await newUser.save();
  //         const token = generateToken(savedUser);
  //         res.cookie("token", token, { httpOnly: true });
  //         return res.status(201).json({ message: "User created" });
  // }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // find email in database matching the email provided by the user
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: true,
    });
    const savedUser = await newUser.save();
    const token = generateToken(newUser);
    return res.status(201).json({
      message: "User created",
      content: {
        name: savedUser.name,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      },
      meta: {
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const token = req.cookies.token;
  if (token) {
    return res.status(200).json({ message: "Already signed in" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({
          message: "Signed in",
          content: {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          meta: {
            token: token,
          },
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { signUp, signIn };
