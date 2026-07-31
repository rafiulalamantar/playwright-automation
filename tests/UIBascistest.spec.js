const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');


test.only('First Playwright Test with browser context', async ({browser}) =>
{

    const context =  await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto(process.env.BASE_URL);

    console.log(await page.title());
    expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill(process.env.TEST_USERNAME);
    await password.fill(process.env.TEST_PASSWORD);
    console.log(await signInBtn.click());
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});
test('First Playwright Test with page', async ({page}) =>
{
    await page.goto(process.env.BASE_URL);
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');

});