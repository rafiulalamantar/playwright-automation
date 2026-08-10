const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboard = new DashboardPage(this.page);

    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboard;
    }
}

module.exports = {POManager};