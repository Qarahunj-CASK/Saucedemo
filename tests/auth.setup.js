/* eslint-disable linebreak-style */
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const { USER_NAME } = process.env;
const { PASSWORD } = process.env;

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page.locator('#user-name').fill(USER_NAME);
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();
  await expect(page).toHaveURL('/inventory.html');
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
