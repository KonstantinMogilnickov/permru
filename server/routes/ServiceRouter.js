const express = require("express");
const serviceRouter = express.Router();
const {
  getMyServices,
  deleteMyService,
  regUser,
  getAllServices,
  getAllRegUsers,
  serviceComplete,
  serviceReject,
} = require("../controllers/serviceController");

serviceRouter.get("/get", getAllServices);
serviceRouter.post("/post", regUser);
serviceRouter.get("/getservicereg", getMyServices);
serviceRouter.delete("/deleteMyService", deleteMyService);
serviceRouter.get("/getAllRegUsers", getAllRegUsers);
serviceRouter.put("/serviceComplete", serviceComplete);
serviceRouter.put("/serviceReject", serviceReject);

module.exports = serviceRouter;
