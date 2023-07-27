import { userService } from "../../services/user.service.js";

export async function getAllUsers(req, res, next) {
  try {
    const response = await userService.getAllUsers();
    res.status(200).json({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      success: true,
      body: {
        message: "Ok",
        data: response,
      },
    });
  } catch (err) {
    next(err);
  }
}
