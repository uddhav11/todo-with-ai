import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import * as dotenv from "dotenv";
dotenv.config();



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },

    async (accessToken, refreshTtaskoken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile?.emails[0]?.value,
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


passport.use(
    new LocalStrategy(
        {usernameField: "email"},

        async (email, password, done) => {
            try {
                const user= await User.findOne({email})
                if(!user){
                    return  done(null, false, {message: "user not found"})
                }
                const isMatch = await user.comparePassword(password)
                if(!isMatch){
                    return done(null, false, {message: "Invalid Credentials"})
                }
                done(null, user)
            } catch (error) {
                done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=> {
    try {
        const user= await User.findById(id);
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})