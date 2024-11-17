const express = require("express");
const ConnectToMongo = require("./moongose");
const path = require("path");
const cors=require("cors");
const dotenv = require('dotenv')

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

dotenv.config();

const app = express();
const port = process.env.PORT || 8000
const uri = process.env.MONGO_URL;
app.use(express.json());
app.use(cors(corsOptions))


ConnectToMongo(uri);

app.use("/auth", require("./routes/auth"));
app.use("/complaint", require("./routes/complaint"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("server is listiening on server 5000");
});
