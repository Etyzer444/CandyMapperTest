import { test, expect, Page } from '@playwright/test';
import { findIframeWithSelector } from './helperFunctions.ts';
test.beforeEach(async ({ page }) => {
  await page.goto('https://candymapper.com/');
  await page.locator('#popup-widget307423-close-icon').click();
  //Just to avoid copy-pasting the code for clicking the popup for every test.
});
//visiblity tests
test('Join Us button visibility test', async ({ page }) => {
  await expect(page.locator('#nav-307305').getByRole('link', { name: 'JOIN US' })).toBeVisible();
});
test('BCS button visibility test', async ({ page }) => {
  await expect(page.locator('#nav-307305').getByRole('link', { name: 'British Computer Society' })).toBeVisible();
});
test('Halloween Party button visibility test', async ({ page }) => {
  await page.getByRole('button', { name: 'More' }).click();
  await expect(page.getByRole('menuitem', { name: 'Halloween Party' }).getByLabel('HomeJOIN USBritish Computer')).toBeVisible();
});
test('Launch Candymapper button visibility test', async ({ page }) => {
  await page.getByRole('button', { name: 'More' }).click();
  await expect(page.getByRole('link', { name: 'Launch CandyMapper' })).toBeVisible();
});
//navigation tests
test('Join Us button navigation test', async ({ page }) => {
    await page.locator('#nav-307305').getByRole('link', { name: 'JOIN US' }).click();
    await expect(page).toHaveURL(RegExp('https:\/\/candymapper.com\/m\/login.*')); 
    //Full URL when I do this test manually is https://candymapper.com/m/login?r=%2Fjoin-us on my machine, however without access to documentation it's hard for me to tell if that url would look the same on other devices.
    //Changing value of the r parameter in the url to a different number doesn't seem to change anything.
  });
test('BCS button navigation test', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.locator('#nav-307305').getByRole('link', { name: 'British Computer Society' }).click();
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL('https://www.bcs.org/'); 
  });
test('Halloween Party button navigation test', async ({ page }) => {
    await page.getByRole('button', { name: 'More' }).click();
    await page.getByRole('menuitem', { name: 'Halloween Party' }).getByLabel('HomeJOIN USBritish Computer').click();
    await expect(page).toHaveURL('https://candymapper.com/halloween-party');
    //Whether the button is on the main navigation menu, or in the "more" submenu depends on the size of the browser screen. A further improvement of this test would be to consider both cases.
  });
test('Launch Candymapper button navigation test', async ({ page }) => {
    await page.getByRole('button', { name: 'More' }).click();
    await page.getByRole('link', { name: 'Launch CandyMapper' }).click();
    await expect(page).toHaveURL('https://candymapper.com/launch-candymapper');
  });
//functionality tests
test('Validate random dollar value test', async ({ page }) => {
  const frame = await findIframeWithSelector(page, '#randomValue');
  const randomValueText = await frame.locator('#randomValue').textContent();
  expect(randomValueText).not.toBeNull();
  expect(randomValueText).toMatch(RegExp("\\d+.\\d\\d"));
})
test('Validate if Worcestershire is available in Slider Challenge test', async ({ page }) => {
  const frame = await findIframeWithSelector(page, '#tCounty');
  await frame.locator('#tCounty').selectOption('SC');
  await expect(frame.locator('#tCounty')).toHaveValue('SC');
});