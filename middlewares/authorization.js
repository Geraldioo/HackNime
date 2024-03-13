
const authorization = async (req, res, next) => {
  try {
    if (req.user.role === "Premium") throw { name: "Forbidden" };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authorization };
