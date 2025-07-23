export default{
    INDEX:async function (req,res) {
        return res.render("index");
    },
    LOGIN:async function (req,res) {
        return res.render("login");
    }
}