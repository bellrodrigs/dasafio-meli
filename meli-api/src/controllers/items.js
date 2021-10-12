const fetch = require('node-fetch')

exports.getItemById = (req, res, next) => {
    const id = req.params.id

    fetch(`https://api.mercadolibre.com/items/${id}`) 
    .then(response => response.json())
    .then(data => {
        fetch(`https://api.mercadolibre.com/items/${id}/description`)
        .then(response => response.json())
        .then(desc => {
            const obj = {
                author: {
                    "name": '',
                    "lastname": ''
                },
                item: {
                    "id": data?.id,
                    "title": data?.title,
                    "price": {
                        "currency": data?.currency_id,
                        "amount": data?.price,
                        "decimals": data?.price.toFixed(2),  
                    },
                    "picture": data?.pictures.slice(0,5),
                    "condition": data?.condition,
                    "free_shipping": data?.shipping?.free_shipping,
                    "sold_quantity": data?.sold_quantity,
                    "description": desc?.plain_text
                }
            }   

            res.status(200).send(obj)
        })
        
    })
}


