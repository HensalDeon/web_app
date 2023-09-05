import UserModel from "../model/User.model.js";

export async function getUserList(req, res) {
    try {
        const userList = await UserModel.find({}).exec();
        if (!userList) {
            return res.status(404).send({ error: "Error fetching user list!" });
        }
        return res.status(200).send(userList);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function searchUser(req, res) {
    try {
        const search = req.body.search;
        const users = await UserModel.find({ username: { $regex: search, $options: "i" } });
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function updateUser(req, res) {
    try {
        const userId = req.params.userId;
        const updatedFields = req.body;

        const existingUser = await UserModel.findOne({ username: updatedFields.username });

        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).send({ error: "Username already exists!" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ error: "User could not be found!" });
        }

        return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function deleteUser(req, res) {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findByIdAndUpdate(userId, { status: false }, { new: true }).exec();

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


export async function enableUser(req, res) {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findByIdAndUpdate(userId, { status: true }, { new: true }).exec();

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User enabled successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
