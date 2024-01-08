const Category = require("../models/Category");

const createCategory = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, isDelete, order } = newProduct;
    try {
      const checkCate = await Category.findOne({
        name: name,
      });
      if (checkCate !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      }
      const newProduct = await Category.create({ name, price, isDelete, order });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCategory = async (limit, page, sort, filter) => {
  try {
    const categoryQuery = {
      ...filter ? { [filter[0]]: { $regex: filter[1], $options: "i" } } : {},
      isDelete: false, // Add condition for isDelete
    };
    const categoryObjectSort = sort ? sort : { order: 1 };

    const allCategories = await Category.find(categoryQuery)
      .sort(categoryObjectSort)
      .limit(limit)
      .skip(page * limit);

    const categoriesWithProducts = await Promise.all(
      allCategories.map(async (category) => {
        const products = await Product.find({
          category_k: category._id,
          isDelete: false, // Add condition for isDelete
        });
        return {
          ...category.toObject(),
          products,
        };
      })
    );

    const countCategories = await Category.countDocuments(categoryQuery);

    const response = {
      status: "OK",
      message: "Success",
      data: categoriesWithProducts,
      total: countCategories,
      pageCurrent: Number(page + 1),
    };

    return response;
  } catch (error) {
    throw error;
  }
};



module.exports = {
    createCategory,
    getAllCategory
};
