const { User, Favorite } = require("../models/index")

class Controller {
    static async (req, res, next){
        try {
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

export default Controller