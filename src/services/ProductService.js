const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, isDelete, order } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      }
      const newProduct = await Product.create({ name, price, isDelete, order });
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

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndUpdate(id, { $set: { isDelete: true } });
      resolve({
        status: "OK",
        message: "Set isDelete to true for the product",
      }); 
    } catch (e) {
      reject(e);
    }
  });
};


const getAllProduct = async (limit, page, sort, filter) => {
  try {
    const query = {
      ...filter ? { [filter[0]]: { $regex: filter[1], $options: "i" } } : {},
      isDelete: false, // Add condition for isDelete
    };
    const objectSort = sort ? sort : { order: 1 };

    const allProduct = await Product.find(query)
      .sort(objectSort)
      .limit(limit)
      .skip(page * limit);
      const countProduct = await Product.countDocuments(query);
    const response = {
      status: "OK",
      message: "Success",
      data: allProduct,
      total: countProduct,
      pageCurrent: Number(page + 1),
    };

    return response;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
};
