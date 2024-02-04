// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login functionality', async() => {

  test.beforeEach("Open the page", async ({ page }) => {
    await page.goto('https://www.bergfreunde.eu/');
    await expect(page).toHaveTitle("Outdoor Gear & Clothing | Outdoor Online Shop | Bergfreunde.eu");
  });
  
  test('POSITIVE-should login with correct credentials', async ({ page }) => {
    await page.locator('[data-codecept="login-icon"]').click();
    await page.locator('input[data-codecept="username"]').fill('chewytester50@gmail.com');
    await page.locator('input[data-codecept="password"]').fill('Chewy1990!');
    await page.locator('button[data-codecept="loginButton"]').click();
    await expect(page.locator('span[data-codecept="userElementHeader"]')).toBeVisible();
  });

  test('NEGATIVE-should not login with incorrect credentials', async ({ page }) => {
    await page.pause();
    await page.locator('[data-codecept="login-icon"]').click();
    await page.locator('input[data-codecept="username"]').fill('11chewytester50@gmail.com');
    await page.locator('input[data-codecept="password"]').fill('11Chewy1990!');
    await page.locator('button[data-codecept="loginButton"]').click();
    await expect(page.locator('div.error')).toBeVisible();
  });
 
});

