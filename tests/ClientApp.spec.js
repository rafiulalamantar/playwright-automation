const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage');

test('Client App test with submit order and extract order ID', async ({page}) =>
{
    const productsNames = "ZARA COAT 3";
    const email = "fijope2288@amupx.com";
    const products = page.locator(".card-body");

    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    loginPage.validateLoginPage(process.env.TEST_EMAIL, process.env.TEST_PASSWORD_CLIENT_APP);
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();// when locator returns single element
    await page.locator(".card-body b").allTextContents();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);



    //select product Zara Coat 4 and click on the add to cart button
    const productCount = await products.count();
    console.log(productCount);
    for (let i = 0; i < productCount; ++i){
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