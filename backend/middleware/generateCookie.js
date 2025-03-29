import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie('token', token, {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production'? 'None' : 'Strict',
    secure: process.env.NODE_ENV !== 'development'
  })

  return token;
};
