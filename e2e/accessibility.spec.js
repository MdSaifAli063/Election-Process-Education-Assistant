import { test, expect } from '@playwright/test';

test('Accessibility check for homepage', async ({ page }) => {
  await page.goto('/');
  
  // Verify main accessibility landmarks
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('main, section')).toHaveCount(curr => curr > 0);
  await expect(page.locator('footer')).toBeVisible();

  // Verify image alt texts
  const images = page.locator('img');
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    await expect(images.nth(i)).toHaveAttribute('alt');
  }
});

test('Mobile navigation accessibility', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Check if chatbot FAB is visible and accessible on mobile
  const fab = page.locator('#chatbot-fab-btn');
  await expect(fab).toBeVisible();
  await expect(fab).toHaveAttribute('aria-label');
});
