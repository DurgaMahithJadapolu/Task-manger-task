const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.send("User registered");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};


//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send("User not found");

//   const transporter = nodemailer.createTransport({ /* SMTP settings */ });
//   const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//   const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

//   await transporter.sendMail({
//     to: email,
//     subject: "Password Reset",
//     text: `Click the link to reset your password: ${resetLink}`,
//   });

//   res.send("Password reset link sent");
// };




const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { registerUser, loginUser, forgotPassword };
