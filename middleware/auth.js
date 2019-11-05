
const checkToken = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization ? authorization.split(' ')[1] : null;
    if (token) {
        if (token === process.env.TOKEN) next();
        else return res.json({
            success: false,
            message: "Token is not valid",
            err: err
        });
    } else {
        return res.json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
}

export default checkToken;