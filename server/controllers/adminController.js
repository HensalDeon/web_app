import UserModel from "../model/User.model.js";

export async function getUserList(req, res){
    try {
      const userList = await UserModel.find({}).exec();
      if(!userList){
        return res.status(404).send({error: "Error fetching user list!"})
      }
      return res.status(200).send(userList)
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}