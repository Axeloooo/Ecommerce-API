import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";

import { createHash, isValidPassword } from "../utils/encrypt.util.js";
import { userRepository } from "../repositories/user.repository.js";
import { User } from "../models/User.js";
import { cartRepository } from "../repositories/cart.repository.js";

dotenv.config();

const localStrategy = local.Strategy;
export function initializePassport() {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, _u, _p, done) => {
        try {
          const { firstName, lastName, email, age, password, role, cid } =
            req.body;
          const context = "passport";
          const user = await userRepository.getUserByEmail(email, context);
          if (user) {
            const deletedCart = await cartRepository.deleteFullCartById(cid);
            console.log(deletedCart);
            return done(null, false);
          }
          const newUser = new User(
            firstName,
            lastName,
            email,
            age,
            createHash(password),
            role,
            cid
          );
          const res = await userRepository.postUser(newUser);
          return done(null, res);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy({ usernameField: "email" }, async (_u, _p, done) => {
      try {
        const context = "passport";
        const user = await userRepository.getUserByEmail(_u, context);
        if (!user) {
          return done(null, false);
        }
        if (!isValidPassword(user, _p)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userRepository.getUserByEmail(profile._json.email);
          if (!user) {
            const newUser = {
              firstName: profile._json.name,
              lastName: "",
              age: "",
              email: profile._json.email,
              password: "",
              role: "",
            };
            const res = await userRepository.postUser(newUser);
            return done(null, res);
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const context = "passport";
    const user = await userRepository.getUserById(id, context);
    done(null, user);
  });
}
