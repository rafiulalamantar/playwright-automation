const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');


test.only('First Playwright Test with browser context', async ({browser}) =>
{
    const context =  await browser.newContext();
    const page =  await context.newPage();
    await page.goto(process.env.BASE_URL);
    console.log(await page.title());
    expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator("#username").fill(process.env.TEST_USERNAME);
    await page.locator("#password").fill(process.env.TEST_PASSWORD);
    console.log(await page.locator("#signInBtn").click());
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');




});
test('First Playwright Test with page', async ({page}) =>
{
    await page.goto(process.env.BASE_URL);
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');

});