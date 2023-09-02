import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
/** */

/** POST: http://localhost:8080/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;
        console.log(req.body);

        // Check if the username already exists
        const existingUsername = await UserModel.findOne({ username }).exec();
        if (existingUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Check if the email already exists
        const existingEmail = await UserModel.findOne({ email }).exec();
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || "",
            email,
        });

        // Save the user document to the database
        const savedUser = await newUser.save();

        res.status(201).send({ msg: "User Registered Successfully", user: savedUser });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
/** POST: http://localhost:8080/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username }).exec();

        if (!user) {
            return res.status(404).send({ error: "Username not Found" });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(400).send({ error: "Password does not Match" });
        }

        // Create a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            ENV.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).send({
            msg: "Login Successful...!",
            username: user.username,
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** GET: http://localhost:8080/user/example123 */
export async function getUser(req, res) {
    res.json("getUser route");
}

/** PUT: http://localhost:8080/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    res.json("updateUser route");
}

/** GET: http://localhost:8080/generateOTP */
export async function generateOTP(req, res) {
    res.json("generateOTP route");
}

/** GET: http://localhost:8080/verifyOTP */
export async function verifyOTP(req, res) {
    res.json("verifyOTP route");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/createResetSession */
export async function createResetSession(req, res) {
    res.json("createResetSession route");
}

// update the password when we have valid session
/** PUT: http://localhost:8080/resetPassword */
export async function resetPassword(req, res) {
    res.json("resetPassword route");
}
