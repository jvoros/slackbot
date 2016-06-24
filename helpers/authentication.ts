if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/** FIXME: Remove this when ready to implement */
const SERVER_SECURED = false;

export function requireAuthentication(req, res, next) {
    /** FIXME */
    console.log('============HEADERS============');
    console.log(req.headers);
    console.log('=============BODY==============');
    console.log(req.body);
    if (req.header('ALIEM_API_KEY') !== process.env.ALIEM_API_KEY && SERVER_SECURED) {
        res.status(401).send('=> ERROR: ALIEM_API_KEY not set or invalid');
        return;
    }
    next();
}
