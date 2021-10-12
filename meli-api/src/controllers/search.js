const fetch = require('node-fetch')


const getSeller = async (sellerId) => {
    console.log('cai no seller')
    fetch(`https://api.mercadolibre.com/users/${sellerId}`) 
    .then(response => response.json())
    .then(data => console.log(data))
}

exports.searchItems = (req, res, next) => {
    const query = req.params.query
    const limit = req.params.limit || 10;
    const page = req.params.page || 0;

    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}&offset=${page}`) 
    .then(response => response.json())
    .then(async (data)=> {

        const obj = []
        data?.results.map(x => {
            obj.push({
                "author": {
                    "name": '',
                    "lastname": ''
                },
                'categories': x?.category_id,
                'item': {
                    "id": x?.id,
                    "title": x?.title,
                    "price": {
                        "currency": x?.currency_id,
                        "amount": x?.price,
                        "decimals": x?.price.toFixed(2),  
                    },
                    "picture": x?.thumbnail,
                    "condition": x?.condition,
                    "free_shipping": x?.shipping?.free_shipping,
                }
            })
        })     

        res.status(200).send(obj)
        
    });
}
