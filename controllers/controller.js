const { User, Favorite, Anime } = require("../models/index");

class Controller {
  static async getAnime(req, res, next) {
    try {
      let { sort, search, page, filterBy } = req.query;
      let option = { order: [["id", "ASC"]]};

      if (search) {
        option.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (filterBy) {
        option.where = {
          type: {
            [Op.eq]: filterBy,
          },
        };
      }

      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;
        option.order = [[columnName, ordering]];
      }

      // console.log(req.query, "<<<");
      let limit = 10;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = +page.size;
          option.limit = limit;
        }

        if (page.number) {
          pageNumber = +page.number;
          option.offset = limit * (pageNumber - 1);
          option.limit = limit;
        }
      } else {
        option.limit = limit;
        option.offset = limit * (pageNumber - 1);
      }

      const { count, rows } = await Anime.findAndCountAll(option);
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
