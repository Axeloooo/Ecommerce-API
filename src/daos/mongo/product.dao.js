import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ServerError } from "../../errors/errors.js";

class ProductDao {
  #productModel;

  constructor(productModel) {
    this.#productModel = productModel;
  }

  async getProducts(limit, page, sort, query) {
    try {
      let searchCriteria = {};
      if (query) {
        const filters = query.split(",");
        filters.forEach((filter) => {
          const [key, value] = filter.split(":");
          searchCriteria[key] = value;
        });
      }
      const paginationOptions = {
        limit: limit ?? 10,
        page: page ?? 1,
        sort: { price: sort ?? "asc" },
        lean: true,
      };
      const res = await productModel.paginate(
        searchCriteria,
        paginationOptions
      );
      return res;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async getProductById(pid) {
    try {
      const res = await productModel.findById(pid).lean();
      return res;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async postProduct(data) {
    try {
      const res = await productModel.create({
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: data.status,
        stock: data.stock,
        category: data.category,
        thumbnails: data.thumbnails,
      });
      return res;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async putProduct(pid, data) {
    try {
      const res = await productModel
        .findByIdAndUpdate(pid, data, { new: true })
        .lean();
      return res;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  async deleteProductById(pid) {
    try {
      const res = productModel.findByIdAndDelete(pid).lean();
      return res;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

const productsCollection = "products";

const productSchema = new Schema(
  {
    title: String,
    description: String,
    code: String,
    price: Number,
    status: {
      type: Boolean,
      default: true,
    },
    stock: Number,
    category: String,
    thumbnails: {
      type: Array,
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);
export const productModel = model(productsCollection, productSchema);

export const mongoProductDao = new ProductDao(productModel);
