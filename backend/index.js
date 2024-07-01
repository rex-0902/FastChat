const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "983330222716-op2ob17n61qhc2tsm2fahg7jf20pns3v.apps.googleusercontent.com"
);

app.use(bodyParser.json());
app.use(cors());

app.post("/api/google-login", async (req, res) => {
  console.log(req);
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
  });

  res.status(200).json(ticket.getPayload());
});

app.listen(4001, () => {
  console.log(`Server is ready at http://localhost:4001`);
});
