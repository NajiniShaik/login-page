require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;


const express=require("express");
const {open}=require("sqlite");
const sqlte3=require("sqlite3");

const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


const cors=require("cors");
const path=require("path");

const app=express();

app.use(cors());
app.use(express.json());


const dbPath=path.join(__dirname,"users.db");

let db=null;


const initializeDBAndServer=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlte3.Database
        })
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE, 
            password TEXT)`
        );

        const adminUser=await db.get("SELECT * FROM users WHERE username=?",["admin"]);
        if (!adminUser){
            const hashedPassword=await bcrypt.hash("admin",10);
            await db.run("INSERT INTO users (username, password) VALUES (?, ?)",["admin",hashedPassword]);
        }

        app.listen(PORT,()=>{
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    }
    catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}

initializeDBAndServer();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });
  console.log("JWT_SECRET:", JWT_SECRET);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}


app.post("/login",async(req,res)=>{
    const {username,password}=req.body;

    try{
        const user=await db.get("SELECT * FROM users WHERE username=?",[username]);
        if (!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match =await bcrypt.compare(password,user.password);
        if (!match){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token=jwt.sign(
            {username:user.username},
            JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    }
    catch(err){
        res.status(500);
        res.send({message: "Server Error"});
    }
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});


module.exports = app;


