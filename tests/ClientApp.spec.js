const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');


test('Browser Context Test', async ({page}) =>
{
    await page.goto(process.env.BASE_URL_CLIENT_APP);
    await page.locator("#userEmail").fill(process.env.TEST_EMAIL);
    await page.locator("#userPassword").fill(process.env.TEST_PASSWORD_CLIENT_APP);
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();// when locator returns single element
    await page.locator(".card-body b").allTextContents();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});