import progressRouter from "./progressRoutes.js";
import paymentRouter from "./paymentRoutes.js";
const initializeRoutes = (app) => {
  app.use("/progress", progressRouter);
  app.use("/payment", paymentRouter);
};

export default initializeRoutes;
