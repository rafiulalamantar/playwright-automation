const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { customTest } = require('../utils/test-base');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test('Client App test with submit order and extract order ID', async ({ page }) => {
   const productsNames = "ZARA COAT 3";
   const products = page.locator(".card-body");

   const loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
   await loginPage.validateLoginPage(process.env.TEST_EMAIL, process.env.TEST_PASSWORD_CLIENT_APP);
   // await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();// when locator returns single element
   await page.locator(".card-body b").allTextContents();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);



   //select product Zara Coat 4 and click on the add to cart button
   const productCount = await products.count();
   console.log(productCount);
   for (let i = 0; i < productCount; ++i) {
      if (await products.nth(i).locator("b").textContent() === productsNames) {
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }

   }
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();

   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

for (const data of dataset) {
   test(`Client App test with submit order and extract order ID using Page Object ${data.productsNames}`, async ({ page }) => {
      const poManager = new POManager(page);

      const loginPage = poManager.getLoginPage();
      await loginPage.goToLoginPage();
      await loginPage.validateLoginPage(data.TEST_EMAIL, data.TEST_PASSWORD);
      const dashboard = poManager.getDashboardPage();
      await dashboard.searchProductAndAddToCart(data.productsNames);
      await dashboard.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(data.productsNames);
      await cartPage.Checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect("ind", "India");
      const orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);
      await dashboard.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

   });
}
customTest.only('Client App Login with Order ID Custom Fixtures', async ({ page,testDataForOrder }) => {
   const poManager = new POManager(page);

   const loginPage = poManager.getLoginPage();
   await loginPage.goToLoginPage();
   await loginPage.validateLoginPage(testDataForOrder.TEST_EMAIL, testDataForOrder.TEST_PASSWORD);
   const dashboard = poManager.getDashboardPage();
   await dashboard.searchProductAndAddToCart(testDataForOrder.productsNames);
   await dashboard.navigateToCart();
});
