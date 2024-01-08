const CategoryService = require("../services/CategoryService");

const createCategory = async (req, res) => {
  try {
    const { name, order } = req.body;

    const requiredFields = [ name, order ];

    if (requiredFields.some((field) => field === undefined || field === "")) {
      return res.status(400).json({
        status: "ERR",
        message: "All required fields must be provided",
      });
    }
    const response = await CategoryService.createCategory(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const getAllCategory = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await CategoryService.getAllCategory(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
    createCategory,
    getAllCategory
};
