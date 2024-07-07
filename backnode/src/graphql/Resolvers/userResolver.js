import User from "../../model/Userprofile.js";

export default {
    Query: {
        users: async () => await User.find()
    },
};
