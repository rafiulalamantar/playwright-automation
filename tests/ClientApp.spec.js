const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');


test('Browser Context Test', async ({page}) =>
{
    const productsNames = "Zara Coat 4";
    const products = page.locator(".card-body");

    await page.goto(process.env.BASE_URL_CLIENT_APP);
    await page.locator("#userEmail").fill(process.env.TEST_EMAIL);
    await page.locator("#userPassword").fill(process.env.TEST_PASSWORD_CLIENT_APP);
    await page.locator("[value='Login']").click();
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

});