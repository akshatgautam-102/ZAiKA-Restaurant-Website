import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from './database/dbconnection.js';
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
dotenv.config({ path: "./config/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.static(path.join(__dirname, "../frontend/public")));
console.log("Checking images folder:", path.join(__dirname, "../frontend/public/img"));
console.log(fs.readdirSync(path.join(__dirname, "../frontend/public/img")));
const fileData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../frontend/restapi.json"), "utf-8")
);

// middlewares
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/v1/reservation', reservationRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: "server running" })
});

// PAGE ROUTES
app.get("/", (req, res) => {
  const main = fileData.data[0];
  res.render("index", {
    navItems: main.navbar,
    qualities: main.ourQualities,
    dishes: main.dishes,
    team: main.team,
    about: main.about,
    whoarewe: main.whoarewe,
  });
});

app.get("/success", (req, res) => {
  res.render("components/success"); 
});

//allmenu 
app.get("/menu",(req,res)=>{
    const main = fileData.data[0];
    res.render('components/allmenu',{
        dishes:main.dishes,
        active:"all"
    })
});
app.get('/menu/:type', (req, res) => {
    const main = fileData.data[0];
    const active = req.params.type || 'all';
    const allDishes = main.dishes;
    let filteredDishes = allDishes;
    if (active !== 'all') {
    filteredDishes = allDishes.filter(d => d.type === active);
    }
    res.render('components/allmenu', { active: active, dishes: filteredDishes  });
    });
// 404
app.use((req, res) => {
  res.status(404).render('components/notfound'); // 
});


dbConnection();
app.use(errorMiddleware);

export default app;