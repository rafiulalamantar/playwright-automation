const {test, expect} = require('@playwright/test');

test('Popup Validations', async ({ page }) => {
    await page.goto(process.env.BASE_URL_V3);
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();


});