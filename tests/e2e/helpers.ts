import { expect, type Page } from '@playwright/test';

/** Collects console errors and uncaught exceptions so tests can assert the page is clean. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/** Opens a route and waits for the intro animation to finish (the sidebar is mounted afterwards). */
export async function open(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator('a[href="/about"]').first()).toBeAttached({ timeout: 10_000 });
}
