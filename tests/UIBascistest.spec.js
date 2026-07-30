const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');


test('First Playwright Test with browser context', async ({browser}) =>
{
    const context =  await browser.newContext();
    const page =  await context.newPage();
    await page.goto('https://www.google.com/');
    console.log(await page.title());
    expect(page).toHaveTitle('Google');


});
test('First Playwright Test with page', async ({page}) =>
{
    await page.goto('https://www.google.com/');
    expect(await page.title()).toBe('Google');

});