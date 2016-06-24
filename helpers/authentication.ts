if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/** FIXME: Remove this when ready to implement */
const SERVER_SECURED = false;

export function requireAuthentication(req, res, next) {
    /** FIXME */
    console.log('============HEADERS============');
    console.log(req.get('ALIEM_API_KEY'));
    console.log(req.get('aliem_api_key'));
    console.log(req.get('AlIEm_aPI_keY'));
    console.log('Is JSON = ', req.is('json'));
    console.log('Is urlencoded = ', req.is('urlencoded'));
    console.log('=============BODY==============');
    console.log(req.body);
    if (req.get('ALIEM_API_KEY') !== process.env.ALIEM_API_KEY && SERVER_SECURED) {
        res.status(401).send('=> ERROR: "aliem_api_key" header not set or invalid');
        return;
    }
    next();
}
