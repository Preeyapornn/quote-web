const jsonServer = require("json-server");
const cors = require("cors");
const jsonServerAuth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(jsonServerAuth);
app.use(router);

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
