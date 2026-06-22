import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import assetsRouter from "./assets";
import aiRouter from "./ai";
import treasuryRouter from "./treasury";
import settlementRouter from "./settlement";
import depositsRouter from "./deposits";
import gatewayRouter from "./gateway";
import demoRouter from "./demo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(assetsRouter);
router.use(aiRouter);
router.use(treasuryRouter);
router.use(settlementRouter);
router.use(depositsRouter);
router.use(gatewayRouter);
router.use(demoRouter);

export default router;
