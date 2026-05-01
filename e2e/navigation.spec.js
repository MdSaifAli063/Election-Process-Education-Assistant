import { test, expect } from '@playwright/test';

test('homepage has title and CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ElectED/);
  const cta = page.getByText(/Start Exploring/i);
  await expect(cta).toBeVisible();
});

test('navigation to timeline works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav >> text=Timeline');
  await expect(page).toHaveURL(/.*timeline/);
  await expect(page.locator('h1')).toContainText(/Election Timeline/i);
});
