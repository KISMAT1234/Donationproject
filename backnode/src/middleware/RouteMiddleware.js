import TokenVerify from "./TokenVerify";


function RouteMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        let response = TokenVerify.verifyToken(token);
        if (response) {
            next();
        } else {
            res.status(200).json({
                error: "Token is not valid"
            });
        }
    } else {
        res.status(200).json({
            error: "No token found"
        });
    }

}

export default RouteMiddleware;