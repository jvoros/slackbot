if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/** FIXME: Remove this when ready to implement */
const SERVER_SECURED = false;

export function requireAuthentication(req, res, next) {
    if (req.get('ALIEM_API_KEY') !== process.env.ALIEM_API_KEY && SERVER_SECURED) {
        res.status(401).send('=> ERROR: "aliem_api_key" header not set or invalid');
        return;
    }
    next();
}
