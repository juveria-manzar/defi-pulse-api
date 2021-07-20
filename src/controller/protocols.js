const axios = require('axios');
const fetch = require('node-fetch');
const ethPrice = require('eth-price');
let price = require('crypto-price')
let responseObj = []

//1Day Change included
exports.getProtocolsAllInfo = async (req, res) => {
    const protocols = await fetch('https://api.llama.fi/protocols')
        .then(response => response.json());
    let tvlPromises = [];
    protocols.forEach(protocol => {
        let formattedTVL = parseFloat(protocol.tvl).toPrecision(2)
        formattedTVL = MoneyFormat(formattedTVL)
        responseObj[protocol.id] = {
            "id": protocol.id,
            "name": protocol.name,
            "chain": protocol.chain,
            "category": protocol.category,
            "tvl": formattedTVL
        }
        let pName = protocol.name
        let pcall = pName.toLowerCase()
        if (pcall.includes(" ")) {
            pcall = pcall.replace(" ", "-")
        }
        tvlPromises.push(
            fetch(`https://api.llama.fi/protocol/${pcall}`)
                .then(response => response.json())
                .then(tvlChange => {
                    // console.log(tvlChange)
                    let formattedTVL = parseFloat(protocol.tvl).toPrecision(2)
                    formattedTVL = MoneyFormat(formattedTVL)
                    return {
                        id: protocol.id,
                        name: protocol.name,
                        chain: protocol.chain,
                        category: protocol.category,
                        tvl: formattedTVL,
                        tvlChange: tvlChange
                    }
                })
        );
    })
    for await (let everyTvl of tvlPromises) {
        if (everyTvl.tvl !== undefined) {
            let tvl = everyTvl.tvlChange.tvl;
            if (everyTvl.tvlChange.name === undefined) {
                continue;
            }
            if (tvl.length != 1 || tvl.length != 0) {
                tvl = tvl.slice(Math.max(tvl.length - 2, 0))
                if (tvl[1] === undefined) {
                    let changeInTvl = "0" + "%"
                    let obj = { "changeInTvl": changeInTvl + "" }
                    Object.assign(responseObj[everyTvl.id], obj)
                } else {
                    let changeInTvl = ((tvl[1].totalLiquidityUSD - tvl[0].totalLiquidityUSD) / tvl[0].totalLiquidityUSD) * 100;
                    changeInTvl = Math.round((changeInTvl + Number.EPSILON) * 100) / 100
                    changeInTvl += "%";
                    let obj = { "changeInTvl": changeInTvl + "" }
                    // let protocol = append(responseObj[p.id], obj)
                    Object.assign(responseObj[everyTvl.id], obj)
                }
            }

        }
    }
    await res.send(responseObj)
};

exports.getProtocols = (req, res) => {
    axios.get('https://api.llama.fi/protocols')
        .then(response => {
            let protocols = []
            response.data.forEach(protocol => {
                let formattedTVL = parseFloat(protocol.tvl).toPrecision(2)
                formattedTVL = MoneyFormat(formattedTVL)
                protocols[protocol.id] = {
                    "name": protocol.name,
                    "chain": protocol.chain,
                    "category": protocol.category,
                    "tvl": formattedTVL
                }
            })
            protocols = protocols.filter(function (el) {
                return !!el;
            });
            res.send(protocols)
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getProtocolByName = (req, res) => {
    const { protocolName } = req.params;
    axios.get(`https://api.llama.fi/protocol/${protocolName}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
};

function MoneyFormat(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

                : Math.abs(Number(labelValue));

}

exports.getHistoryAll = (req, res) => {
    axios.get("https://api.llama.fi/charts")
        .then(response => {
            let obj = []
            response.data.forEach(protocol => {
                let date = new Date(protocol.date * 1000).toLocaleString();
                // let money = MoneyFormat(protocol.totalLiquidityUSD)
                // money = parseFloat(money).toPrecision(2) + money.replace(/[^B|M|K]/g, "")
                obj.push({
                    "date": date,
                    "totalLiquidityUSD": protocol.totalLiquidityUSD
                })
            });
            res.send(obj);
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getProtocolTVL = (req, res) => {
    const { protocolName } = req.params;
    axios.get(`https://api.llama.fi/tvl/${protocolName}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getCurrVal = async (req, res) => {

    let btcPrice= await price.getCryptoPrice('USD', 'BTC')
    let ethPrice= await price.getCryptoPrice('USD', 'ETH')

    btcPrice=btcPrice.price;
    ethPrice=ethPrice.price
    res.json({btcPrice,ethPrice})
}