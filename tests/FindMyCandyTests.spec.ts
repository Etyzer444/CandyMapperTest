import { test, expect, Page } from '@playwright/test';
import { findIframeWithSelector } from './helperFunctions.ts';
test.beforeEach(async ({ page }) => {
    await page.goto('https://candymapper.com/');
    await page.locator('#popup-widget307423-close-icon').click();
    //Just to avoid needing to repeat clicking the popup for each test.
    await page.goto('https://candymapper.com/find-my-candy');
  });
//visibility tests
test('Name text field visibility test', async ({ page }) => {
    const frame = await findIframeWithSelector(page, 'textarea');
    await expect(frame.getByRole('textbox', { name: 'characters' })).toBeVisible();
  });
  test('Quest text field visibility test', async ({ page }) => {
    const frame = await findIframeWithSelector(page, 'textarea');
    await expect(frame.getByRole('textbox', { name: 'Other notes' }).first()).toBeVisible();
  });
test('Swallow Velocity text field visibility test', async ({ page }) => {
    const frame = await findIframeWithSelector(page, 'textarea');
    await expect(frame.getByRole('textbox', { name: 'Other notes' }).nth(1)).toBeVisible();
  });
//navigation tests - since there is no functionality on this page that would send the user to another page, those are basically the same menu tests as in MainPageTests
test('Join Us button navigation test', async ({ page }) => {
    await page.locator('#nav-307439').getByRole('link', { name: 'JOIN US' }).click();
    await expect(page).toHaveURL(RegExp('https:\/\/candymapper.com\/m\/login.*')); 
  });
test('BCS button navigation test', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.locator('#nav-307439').getByRole('link', { name: 'British Computer Society' }).click();
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
test('Name text field character limit test', async ({ page }) => {
    const frame = await findIframeWithSelector(page, 'textarea');
    var hundredCharString ='';
    for (let i = 0; i < 100; i++)
    {
        hundredCharString+='a';
    }
    await frame.getByRole('textbox', { name: 'characters' }).fill(hundredCharString);
    var a = await frame.getByRole('textbox', { name: 'characters' }).inputValue();
    expect(a?.length).toBe(100);
  });
  test('Quest text field character limit test', async ({ page }) => {
    const frame = await findIframeWithSelector(page, 'textarea');
    var hundredCharString ='';
    for (let i = 0; i < 100; i++)
    {
        hundredCharString+='a';
    }
    await frame.getByRole('textbox', { name: 'Other notes' }).first().fill(hundredCharString);
    var a = await frame.getByRole('textbox', { name: 'Other notes' }).first().inputValue();
    expect(a?.length).toBe(100);
  });
test('Swallow Velocity text field character limit test', async ({ page }) => {
    const frame = await findIframeWithSelector(page, 'textarea');
    var hundredCharString ='';
    for (let i = 0; i < 100; i++)
    {
        hundredCharString+='a';
    }
    await frame.getByRole('textbox', { name: 'Other notes' }).nth(1).fill(hundredCharString);
    var a = await frame.getByRole('textbox', { name: 'Other notes' }).nth(1).inputValue();
    expect(a?.length).toBe(100);
  });