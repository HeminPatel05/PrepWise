import progressRouter from "./progressRoutes.js";

const initializeRoutes = (app) => {
  app.use("/progress", progressRouter);
};

export default initializeRoutes;
