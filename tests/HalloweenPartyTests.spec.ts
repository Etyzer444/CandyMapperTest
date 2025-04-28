import { test, expect, Page } from '@playwright/test';
import { findIframeWithSelector } from './helperFunctions.ts';
 test.beforeEach(async ({ page }) => {
    await page.goto('https://candymapper.com/');
    await page.locator('#popup-widget307423-close-icon').click();
    //Just to avoid needing to repeat clicking the popup for each test.
  });
//visibility tests
 test('Halloween Party Button Visibility Test', async ({ page }) => {
    await page.goto('https://candymapper.com/halloween-party');
    await expect(page.getByRole('link', { name: 'I Am Hosting A Party' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'I Am Attending A Party' })).toBeVisible();
  });
 test('Host a Party Button Visibility Test', async ({ page }) => {
    await page.goto('https://candymapper.com/host-a-party-1');
    await expect(page.getByRole('link', { name: 'Zombies' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ghosts' })).toBeVisible();
  });
 test('Attend a Party Button Visibility Test', async ({ page }) => {
    await page.goto('https://candymapper.com/attend-a-party');
    await expect(page.getByRole('link', { name: 'Zombieton' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ghostville' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'I\'m Scared, Let\'s Go Back!' })).toBeVisible();
  });
 test('Party Location Button and Form Visibility Test', async ({ page }) => {
    await page.goto('https://candymapper.com/party-location');
    const frame = await findIframeWithSelector(page, '#guests');
    await expect(frame.getByLabel('Heck yeah, I\'m bringing my friends! There is safety in numbers: ')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remind Me' })).toBeVisible();
 })

//navigation tests
 test('Host a Party Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/halloween-party');
    await page.getByRole('link', { name: 'I Am Hosting A Party' }).click();
    await expect(page).toHaveURL('https://candymapper.com/host-a-party-1');
 });
 test('Attend a Party Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/halloween-party');
    await page.getByRole('link', { name: 'I Am Attending A Party' }).click();
    await expect(page).toHaveURL('https://candymapper.com/attend-a-party');
 });
 test('Zombies Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/host-a-party-1');
    await page.getByRole('link', { name: 'Zombies' }).click();
    await expect(page).toHaveURL('https://candymapper.com/party-location');
 });
 test('Ghosts Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/host-a-party-1');
    await page.getByRole('link', { name: 'Ghosts' }).click();
    await expect(page).toHaveURL('https://candymapper.com/party-location');
 });
 test('Zombieton Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/attend-a-party');
    await page.getByRole('link', { name: 'Zombieton' }).click();
    await expect(page).toHaveURL('https://candymapper.com/party-location');
 });
 test('Ghostville Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/attend-a-party');
    await page.getByRole('link', { name: 'Ghostville' }).click();
    await expect(page).toHaveURL('https://candymapper.com/party-location');
 });
 test('I Am Scared Button Navigation test', async ({ page }) => {
    await page.goto('https://candymapper.com/attend-a-party');
    await page.getByRole('link', { name: 'I\'m Scared, Let\'s Go Back!' }).click();
    await expect(page).toHaveURL('https://candymapper.com/');
 });
//functionality tests
 test('Party Location wrong email validation test', async ({ page }) => {
    await page.goto('https://candymapper.com/party-location');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('notAnEmail');
    await page.getByRole('button', { name: 'Remind Me' }).click();
    await expect(page.getByRole('alertdialog')).toContainText('Please enter a valid email address.');
 });
 test('Party Location valid email validation test', async ({ page }) => {
    await page.goto('https://candymapper.com/party-location');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('correct@email.com');
    await page.getByRole('button', { name: 'Remind Me' }).click();
    await expect(page.locator('#page-189831')).toContainText('If you supplied a real email we just send a validation to it.');
 });
 test('Party Location Number of Guests Form Test', async ({ page }) =>{
    await page.goto('https://candymapper.com/party-location');
    const frame = await findIframeWithSelector(page, '#guests');
    for (let i = 2; i >= 0; i--) {
        await frame.getByLabel('Heck yeah, I\'m bringing my friends! There is safety in numbers: ').selectOption(i.toString());
        await expect(frame.getByLabel('Heck yeah, I\'m bringing my friends! There is safety in numbers: ')).toHaveValue(i.toString());
      }
   //For some reason, this test has inconsistent results. When it fails, it gets stuck on finding the iframe locator.
 });