import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    const authorization = req.headers['authorization'];
    console.log(authorization);
    const token = authorization ? authorization.split(' ')[1] : null;
    console.log(token);
    console.log(process.env.TOKEN);
    if(token){
        jwt.verify(token, process.env.TOKEN, (err, decoded) => {
            if(err){
                return res.json({
                    success: false,
                    message: "Token is not valid",
                    err: err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
}

export default checkToken;