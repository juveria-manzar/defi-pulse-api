const axios = require('axios')


//TODO add % percentage chnge
exports.getProtocols = (req, res) => {
    axios.get('https://api.llama.fi/protocols')
        .then(response => {
            let protocols=[]
            response.data.forEach(protocol=>{
                let formattedTVL=parseFloat(protocol.tvl).toPrecision(2)
                formattedTVL=MoneyFormat(formattedTVL)
                protocols[protocol.id]={
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
    console.log(protocolName)
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
                let money=MoneyFormat(protocol.totalLiquidityUSD)
                money=parseFloat(money).toPrecision(2) + money.replace(/[^B|M|K]/g,"")
                obj.push({
                    "date": date,
                    "totalLiquidityUSD": money
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