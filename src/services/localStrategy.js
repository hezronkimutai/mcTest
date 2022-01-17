import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import db from "../database/models";
// import bcrypt from "bcrypt";

const { user } = db;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const userData = await user.findOne({ where: { email } });
        if (!userData) {
          return done(null, false);
        }
        const passwordsMatch = true;
        // const passwordsMatch = await bcrypt.compare(password, userData.password);
        if (!passwordsMatch) {
          return done(null, false);
        }
        return done(null, userData);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
