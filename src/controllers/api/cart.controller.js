import { cartRepository } from "../../repositories/cart.repository.js";

export async function getCartById(req, res) {
  try {
    const cid = req.params.cid;
    const cart = await cartRepository.getCartById(cid);
    if (!cart) {
      res.status(404).json({
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Not Found",
        },
      });
    }
    res.status(200).json({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Ok",
        cart: cart,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}

export async function postCart(req, res) {
  try {
    const cart = await cartRepository.postCart();
    if (!cart) {
      res.status(400).json({
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Client Error",
        },
      });
    }
    res.status(201).json({
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Created",
        cart: cart,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}

export async function postProductInCartById(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const product = await cartRepository.postProductInCartById(cid, pid);
    if (!product) {
      res.status(404).json({
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Not Found",
        },
      });
    }
    res.status(201).json({
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Created",
        product: product,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}

export async function putCartById(req, res) {
  try {
    const cid = req.params.cid;
    const data = req.body;
    const cart = await cartRepository.putCartById(cid, data);
    if (!cart) {
      res.status(400).json({
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Client Error",
        },
      });
    }
    res.status(200).json({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Ok",
        product: cart,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}

export async function putProductInCartById(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const data = req.body;
    const product = await cartRepository.putProductInCartById(cid, pid, data);
    if (!product) {
      res.status(404).json({
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Not Found",
        },
      });
    }
    res.status(200).json({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Ok",
        product: product,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}

export async function deleteCartById(req, res) {
  try {
    const cid = req.params.cid;
    const cart = await cartRepository.deleteCartById(cid);
    if (!cart) {
      res.status(400).json({
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Client Error",
        },
      });
    }
    res.status(200).json({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Ok",
        cart: cart,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}

export async function deleteProductInCartById(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const product = await cartRepository.deleteProductInCartById(cid, pid);
    if (!product) {
      res.status(404).json({
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
        success: false,
        body: {
          message: "Not Found",
        },
      });
    }
    res.status(200).json({
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Ok",
        product: product,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: {
        error: "Server Error",
      },
    });
  }
}
