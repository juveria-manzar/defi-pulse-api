const express = require("express");
const router = express.Router();

const { getProtocols, getProtocolsAllInfo, getProtocolByName, getProtocolTVL, getHistoryAll, getCurrVal} = require("../controller/protocols");

router.get("/protocols", getProtocols);
router.get("/protocols/all", getProtocolsAllInfo);
router.get("/protocol/:protocolName", getProtocolByName);
router.get("/chart", getHistoryAll);
router.get("/protocol/tvl/:protocolName", getProtocolTVL);
router.get("/values", getCurrVal);

module.exports = router;
