import { userRepository } from "../../repositories/user.repository.js";

import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "../../errors/errors.js";

export async function postRegister(req, res, next) {
  try {
    const { cid } = req.body;
    res.status(200).json(cid);
  } catch (error) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function postLogin(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return next(new NotFoundError("Not Found"));
    }
    req.session.user = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
    };
    res.status(200).json(user.cid);
  } catch (error) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function postLogout(req, res, next) {
  try {
    req.logout((error) => {
      if (error) {
        return next(new BadRequestError("Client Error"));
      } else {
        res.status(200).json({
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          success: true,
          body: {
            message: "Ok",
          },
        });
      }
    });
  } catch (error) {
    return next(new InternalServerError("Server Error"));
  }
}

export async function postGitHubLogin(req, res, next) {
  try {
    req.session.user = req.user;
    res.status(200).redirect("/products");
  } catch (err) {
    return next(new InternalServerError("Server Error"));
  }
}
