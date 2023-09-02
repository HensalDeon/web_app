import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";

/** middleware for verify user*/
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

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
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username }).exec();

        if (!user) {
            return res.status(404).send({ error: "Couldn't Find the User" });
        }

        // Remove password from user object
        // const { password, ...rest } = Object.assign({}, user.toJSON());
        const { password, ...rest } = user.toObject();

        return res.status(200).send(rest);
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** PUT: http://localhost:8080/update-user 
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
    try {
        // const { id } = req.query;
        const { userId } = req.user;
        console.log(req.user);

        if (!userId) {
            return res.status(401).send({ error: "User Not Found...!" });
        }

        const updatedFields = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true } // To get the updated user document
        );

        if (!updatedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** GET: http://localhost:8080/generateOTP */
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/verifyOTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: "Verified Successsfully!" });
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/create-resetSession */
export async function createResetSession(req, res) {
    // if (req.app.locals.resetSession) {
    //     return res.status(201).send({ flag: req.app.locals.resetSession });
    // }
    // return res.status(440).send({ error: "Session expired!" });
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false; //allow access to this route only once
        return res.status(201).send({ msg: "access granted!" });
    }
    return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:8080/reset-password */
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if(!hashedPassword){
            return res.status(500).send({error: "Unable to hash password"})
        }
        await UserModel.updateOne({ username: user.username }, { password: hashedPassword });
        req.app.locals.resetSession = false; // Reset session

        return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
