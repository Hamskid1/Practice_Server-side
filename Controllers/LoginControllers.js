import Login from "../Models/LoginModels";

export const getLogin = async (res,req) =>{
    try {
        const login = await Login.find()
        if(login.length == 0){
            return res.status(404).json({message: "No login found"})
        }
        return res.status(200).json(login)
    } catch (error) {
        return res.status(500).json({message: "Error fetching login", error})
    }
};

