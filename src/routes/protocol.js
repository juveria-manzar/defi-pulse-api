const express = require("express");
const router = express.Router();

const { getProtocols, getProtocolByName, getProtocolTVL, getHistoryAll, getTodaysTvl } = require("../controller/protocols");

router.get("/protocols", getProtocols);
router.get("/protocols/tvl", getTodaysTvl);
router.get("/protocol/:protocolName", getProtocolByName);
router.get("/chart", getHistoryAll);
router.get("/protocol/tvl/:protocolName", getProtocolTVL);

module.exports = router;
