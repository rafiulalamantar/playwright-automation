const {test} = require('@playwright/test');


test('First Playwright Test with browser context', async ({browser}) =>
{
    const context =  await browser.newContext();
    const page =  await context.newPage();
    await page.goto('https://www.google.com/');
    console.log(await page.getByTitle('Google').click());


});
test.only('First Playwright Test with page', async ({page}) =>
{
    await page.goto('https://www.google.com/');


});