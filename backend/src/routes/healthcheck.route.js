import { healthCheck } from "../controllers/healthcheck.controller.js";

import { Router } from "express";

const routing=Router();

routing.route("/").get(healthCheck);

export default routing;
