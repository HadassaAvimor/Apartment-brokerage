module.exports = function() {
    return function (req, res, next) {
        console.log(`Time: ${new Date()}, A hospitality apartment has been added in the city of  ${req.body.city}.`);
        if (next) next();
    }
}