if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const unirest = require('unirest');

export namespace get {

    const HEADERS = {
        'cache-control': 'no-cache',
        'authorization': process.env.ALIEMU_REST_AUTH,
    };

    export function user(userID: string|number): Promise<WordPress.User> {
        return new Promise<WordPress.User>((resolve, reject) => {
            unirest.get(`https://www.aliemu.com/wp-json/wp/v2/users/${userID}`)
            .headers(HEADERS)
            .query('context=edit')
            .end(res => {
                if (res.error) reject(console.error(res.error));
                resolve(res.body);
            });
        });
    }
}

export namespace update {

    const HEADERS = {
        'cache-control': 'no-cache',
        'authorization': process.env.ALIEMU_REST_AUTH,
        'content-type': 'application/json',
    };

    export function user(userID: string|number, data: WordPress.User): Promise<WordPress.User> {
        return new Promise<WordPress.User>((resolve, reject) => {
            unirest.post(`https://www.aliemu.com/wp-json/wp/v2/users/${userID}`)
            .headers(HEADERS)
            .type('json')
            .send(data)
            .end(res => {
                if (res.error) reject(console.error(res.error));
                resolve(res.body);
            });
        });
    }
}
