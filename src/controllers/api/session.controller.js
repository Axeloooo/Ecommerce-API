import { userRepository } from "../../repositories/user.repository.js";

export async function postRegister(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: { error: "Server Error" },
    });
  }
}

export async function postLogin(req, res) {
  try {
    const { email } = req.body;
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
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
    req.session.user = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
    };
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
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: { error: "Server Error" },
    });
  }
}

export async function postLogout(req, res) {
  try {
    req.logout((error) => {
      if (error) {
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
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: { error: "Server Error" },
    });
  }
}

export async function postGitHubLogin(req, res) {
  try {
    req.session.user = req.user;
    res.status(200).redirect("/products");
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      success: false,
      body: { error: "Server Error" },
    });
  }
}
