const express = require("express");
const ConnectToMongo = require("./moongose");
const path = require("path");
const cors=require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions))



var uri =
  "mongodb+srv://mdtauhidiit:XP824W2sveqmNcNW@cluster0.xjpa3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

ConnectToMongo(uri);

app.use("/auth", require("./routes/auth"));
app.use("/complaint", require("./routes/complaint"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(5000, () => {
  console.log("server is listiening on server 5000");
});
