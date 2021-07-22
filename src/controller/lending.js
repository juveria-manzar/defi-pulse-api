const axios = require('axios');
const fetch = require('node-fetch');

const key = "98222f0967f5b22bfd34571d0790b2cdfcfbd7d1348c10bc0f101d976a11"


exports.getLendingProjects = (req, res) => {
    axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/GetLendingProjects?api-key=${key}`)
        .then(projects => {
            res.status(200).send(projects.data)
        })
        .catch(error => {
            res.status(400).send(error)
        });
};

exports.getLendingHistory = (req, res) => {
    axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/getLendingHistory?api-key=${key}`)
        .then(history => {
            res.status(200).send(history.data)
        }).catch(error => {
            res.status(400).send(error)
        })
}


exports.getLendingHistoryByPeriod = (req, res) => {
    const period = req.params.period
    // const resolution=req.params.resolution

    console.log(period)
    axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/getLendingHistory?api-key=${key}`, { params: { period: period } })
        .then(history => {
            res.status(200).send(history.data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getLendingHistoryByLength = (req, res) => {
    const length = req.params.length
    // const resolution=req.params.resolution

    console.log(length)
    axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/getLendingHistory?api-key=${key}`, { params: { length: length } })
        .then(history => {
            res.status(200).send(history.data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getInterestRates = (req, res) => {
    axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?api-key=98222f0967f5b22bfd34571d0790b2cdfcfbd7d1348c10bc0f101d976a11`)
        .then(rates => {
            res.status(200).json(rates.data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getLendingMarketData = (req,res)=>{
    axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/LendingMarketData?api-key=${key}`)
        .then(market => {
            res.status(200).json(market.data)
        }).catch(error => {
            res.status(400).send(error)
        })
}