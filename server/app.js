if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const route = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

module.exports = {
  apps: [
    {
      name: "Hacknime",
      script: "./app.js",
      env: {
        SECRET_JWT: "kzhayin",
        PORT: 80,
        GOOGLE_CLIENT_ID:
          "69395850274-8h7op1snhdk96ebh6l9r9np01v31lp7v.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
        SERVER_KEY_MIDTRANS: "SB-Mid-server-_C7h2LxQryCJdMPuXmQRobWc",
        NODEMAILER_EMAIL: "bryangeraldioo@gmail.com",
        NODEMAILER_PW: "tnlb tnoc gscn gfwx",
        DATABASE_URL:
          "postgres://postgres.bndutznlrgkvrgctgmnt:vK1VZX7rWQfqAkTk@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
      },
    },
  ],
};
