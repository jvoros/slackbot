if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/** FIXME: Remove this when ready to implement */
const SERVER_SECURED = false;

export function requireAuthentication(req, res, next) {
    /** FIXME */
    console.log('============HEADERS============');
    console.log(req.headers);
    console.log('=> Lowercase Key: ', req.header('aliem_api_key'));
    console.log('=> Uppercase Key: ', req.header('ALIEM_API_KEY'));
    console.log('=============BODY==============');
    console.log(req.body);
    if (req.header('aliem_api_key') !== process.env.ALIEM_API_KEY && SERVER_SECURED) {
        res.status(401).send('=> ERROR: "aliem_api_key" header not set or invalid');
        return;
    }
    next();
}
