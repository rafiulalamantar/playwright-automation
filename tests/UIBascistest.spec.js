const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');


test('First Playwright Test with browser context', async ({browser}) =>
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
test('UI Controls', async ({page}) =>
{
    await page.goto(process.env.BASE_URL);
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const documentsRequest = page.locator("[href*='documents-request']");

    await userName.fill(process.env.TEST_USERNAME);
    await password.fill(process.env.TEST_PASSWORD);
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect (documentsRequest).toHaveAttribute('class', 'blinkingText');

});

test('Child Windows', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto(process.env.BASE_URL);
    const documentsRequest = page.locator("[href*='documents-request']");

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        documentsRequest.click()
    ]);

    const text = await childPage.locator(".red").textContent();
    const domainName = text.split("@")[1].split(" ")[0];
   // console.log(domainName);
    await page.locator("#username").fill(domainName);
    await page.pause();
    console.log(await page.locator("#username").inputValue());


});

test.only('Special Elements', async ({page}) =>{

    await page.goto(process.env.BASE_URL_V2);
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();


    expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
});

test('Special Elements Wait ', async ({page}) =>{

    test.timeout(60000);
    const slowExp = expect.configure({timeout: 9000});
    page.setDefaultTimeout(9000);

    await page.goto(process.env.BASE_URL_V2);
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();

    //5s
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();


    await slowExp(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
    await page.getByRole("link",{name : "Shop"}).click();
    await slowExp(page.locator("my-4").first()).toHaveText("Shop");
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
});