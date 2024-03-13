const errHandler = (err, req, res, next) => {
    switch (err.name) {
      case "SequelizeValidationError":
          res.status(400).json({ message: err.errors[0].message });
          break;
      case "SequelizeUniqueConstraintError":
          res.status(400).json({ message: "Email Already Exist"});
          break
      case "EmailRequired":
        res.status(400).json({ message: "Email is required" });
        break;
      case "PassRequired":
        res.status(400).json({ message: "Password is required" });
        break;
      case "InvalidLogin":
        res.status(401).json({ message: "Invalid Email/Password" });
        break;
      case "NotFound":
        res.status(404).json({ message: "Error Data Not Found" });
        break;
      case "InvalidToken":
      case "JsonWebTokenError":
        res.status(401).json({ message: "Invalid Token" });
        break;
      case "Forbidden":
        res.status(403).json({ message: "Forbidden" });
        break;
      default:
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  };
  
  module.exports = { errHandler };
  