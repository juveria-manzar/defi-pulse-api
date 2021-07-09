const express = require("express");
const router = express.Router();

const { getProtocols, getProtocolByName, getProtocolTVL, getHistoryAll } = require("../controller/protocols");

router.get("/protocols", getProtocols);
router.get("/protocol/:protocolName", getProtocolByName);
router.get("/chart", getHistoryAll);
router.get("/protocol/tvl/:protocolName", getProtocolTVL);

module.exports = router;
