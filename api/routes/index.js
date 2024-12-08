import progressRouter from "./progressRoutes.js";
import paymentRouter from "./paymentRoutes.js";
import flashcardRoutes from "./flashcardRoutes.js"; // Flashcard routes
import testRoutes from "./testRoutes.js";
import userRoutes from "./userRoutes.js";

const initializeRoutes = (app) => {
  app.use("/progress", progressRouter);
  app.use("/payment", paymentRouter);
  app.use("/flashcards", flashcardRoutes); // Add flashcard routes
  app.use("/", testRoutes); // Mount the testRoutes on the root path
  app.use("/api/users", userRoutes); // Mount the userRoutes on the '/api/users' path
};

export default initializeRoutes;
