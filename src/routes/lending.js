const express = require("express");
const router = express.Router();

const { getLendingProjects, getLendingHistory, getLendingHistoryByPeriod, getLendingHistoryByLength, getInterestRates, getLendingMarketData } = require("../controller/lending");

//Returns detailed breakdown of current DeFi lending projects found on DeFi Pulse Lending.
router.get("/all", getLendingProjects);

// '/history'
//Returns historical data for a lending projects tracked on DeFi Pulse Lending over a given period of time.
// Observe that the first entry in the array concerns the ongoing period (hour or day), while the following entries always concern a full period (hour or day) in the past, stepping back in time, starting from the period before the ongoing period. Timestamps are Unix epoch time.
router.get("/history", getLendingHistory);

// Per timestamp, composite rates are given as lend_rates and borrow_rates. The endpoint also returns interest_speed and outstanding debt in total (USD and ETH), as well as for various individual tokens. See the graphs on this page to understand the values returned: https://defipulse.com/defi-lending.

//Time period: 1w, 1m, 3m, 1y, or all. 
router.get("/history/period/:period", getLendingHistoryByPeriod);

//length of data set in hours or days can be used as an alternative to period for a more granular control over the returned data set
router.get("/history/length/:length", getLendingHistoryByLength);

router.get("/rate/token/:token&:amount",getInterestRates)

router.get("/markets",getLendingMarketData)

module.exports = router;
