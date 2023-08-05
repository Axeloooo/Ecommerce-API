import { Schema, model } from "mongoose";

class CartDao {
  #cartModel;

  constructor(cartModel) {
    this.#cartModel = cartModel;
  }

  async getCarts() {
    try {
      const res = await this.#cartModel.find();
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCartById(cid) {
    try {
      const res = await this.#cartModel
        .findById(cid)
        .populate("products.product");
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postCart() {
    try {
      const res = await this.#cartModel.create({ products: [] });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postProductInCartById(cid, pid) {
    try {
      const cart = await this.#cartModel.findById(cid);
      for (let item of cart.products) {
        if (item.product._id == pid) {
          item.quantity += 1;
          const res = await cart.save();
          return res;
        }
      }
      cart.products.push({
        product: pid,
        quantity: 1,
      });
      const res = await cart.save();
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async putCartById(cid, data) {
    try {
      const cart = await this.#cartModel.findById(cid);
      cart.products = data;
      const res = cart.save();
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async putProductInCartById(cid, pid, data) {
    try {
      const cart = await this.#cartModel.findById(cid);
      for (let item of cart.products) {
        if (item.product._id == pid) {
          item.quantity = data.quantity;
          const res = await cart.save();
          return res;
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCartById(cid) {
    try {
      const cart = await this.#cartModel.findById(cid);
      cart.products = [];
      const res = await cart.save();
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteFullCartById(cid) {
    try {
      const cart = await this.#cartModel.findByIdAndDelete(cid).lean();
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductInCartById(cid, pid) {
    try {
      let cart = await this.#cartModel.findById(cid);
      cart.products = cart.products.filter(
        (item) => !item.product._id.equals(pid)
      );
      const res = await cart.save();
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const cartsCollection = "carts";

const cartSchema = new Schema(
  {
    products: {
      type: [
        {
          quantity: {
            type: Number,
            default: 0,
          },
          product: {
            type: Schema.Types.ObjectId,
            ref: "products",
          },
        },
      ],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

const cartModel = model(cartsCollection, cartSchema);

export const mongoCartDao = new CartDao(cartModel);
