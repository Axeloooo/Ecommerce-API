export const CORS = {
  origin:
    process.env.NODE_ENV === "PROD"
      ? process.env.CLIENT_URL
      : process.env.LOCAL_URL,
  credentials: true,
};
