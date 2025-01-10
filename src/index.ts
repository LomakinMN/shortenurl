import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import sequelize from "./utils/database"; // Импортируйте ваше соединение с базой данных
import urlRoutes from "./routes/urlRoutes"; // Импортируйте маршруты

export const app = express();

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Подключение маршрутов
app.use("/", urlRoutes);

// Обработка ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Подключение к базе данных и запуск сервера
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
