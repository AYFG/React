// app.get  -> 가져오다
// app.post -> 생성하다
// app.put -> 전체 수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러보기
// app.head -> 헤더만 가져오기(헤더/바디)

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);

// 운영체제마다 경로설정이 다르기 때문에 path.join 사용
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});
app.get("/api", (req, res) => {
  res.send("hello api");
});

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
