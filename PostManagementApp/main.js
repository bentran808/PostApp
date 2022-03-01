const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(middlewares);

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

// Verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) =>
        decode !== undefined ? decode : err
    );
}

// Check if the user exists in database
function existUser({email, password}) {
    return userdb.users.find(
        user => user.email === email && user.password === password
    );
}

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
    console.log('login endpoint called; request body:');
    console.log(req.body);
    const {email, password} = req.body;
    const user = existUser({email, password});
    if (!user) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({status, message});
        return;
    }
    const access_token = createToken({email, password});
    console.log('Access Token:' + access_token);
    res.status(200).json({
        access_token,
        data: {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        }
    });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({status, message});
        return;
    }
    try {
        let verifyTokenResult;
        verifyTokenResult = verifyToken(
            req.headers.authorization.split(' ')[1]
        );

        if (verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Access token not provided';
            res.status(status).json({status, message});
            return;
        }
        next();
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({status, message});
    }
});

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();
    } else if (req.method === 'PATCH') {
        req.body.updatedAt = Date.now();
    }
    // Continue to JSON Server router
    next();
});

// Use default router
server.use('/api', router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
