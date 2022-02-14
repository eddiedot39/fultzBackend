import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const tokenHeader = req.headers.authentication
    const token = tokenHeader.split(" ")[1];
}