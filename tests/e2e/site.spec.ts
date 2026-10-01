import { expect, test } from '@playwright/test';
import { open, trackErrors } from './helpers';

const ROUTES = [
  { path: '/', title: /Senior Software QA Engineer/, canonical: 'https://turanaymis.com/' },
  { path: '/about', title: /About Turan Aymis/, canonical: 'https://turanaymis.com/about' },
  { path: '/skills', title: /QA Skills & Tech Stack/, canonical: 'https://turanaymis.com/skills' },
  { path: '/experience', title: /Work Experience/, canonical: 'https://turanaymis.com/experience' },
  { path: '/projects', title: /Projects/, canonical: 'https://turanaymis.com/projects' },
  { path: '/contact', title: /Contact Turan Aymis/, canonical: 'https://turanaymis.com/contact' },
];

test.describe('every page', () => {
  for (const route of ROUTES) {
    test(`${route.path} renders cleanly with correct SEO tags`, async ({ page }) => {
      const errors = trackErrors(page);
      await open(page, route.path);

      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, 'horizontal overflow').toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test('unknown routes redirect to the home page', async ({ page }) => {
    await open(page, '/does-not-exist');
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('content matches the CV', () => {
  test('home shows the senior title and summary', async ({ page }) => {
    await open(page, '/');
    await expect(page.getByText('Senior Software QA Engineer').first()).toBeVisible();
    await expect(page.getByText(/LLM-as-a-Judge system that evaluates 400\+/)).toBeVisible();
  });

  test('experience lists employers with correct dates', async ({ page }) => {
    await open(page, '/experience');
    const text = page.locator('body');
    await expect(text).toContainText('Monster Notebook');
    await expect(text).toContainText('Sep 2021 – Present');
    await expect(text).toContainText('Sep 2018 – Apr 2021');
    await expect(text).toContainText('TypeScript + Playwright framework');
  });

  test('skills include the CV tooling', async ({ page }) => {
    await open(page, '/skills');
    for (const skill of ['Playwright', 'Pytest', 'Allure Report', 'GitHub Actions']) {
      await expect(page.getByText(skill, { exact: true }).first()).toBeVisible();
    }
  });

  test('about lists education and certifications', async ({ page }) => {
    await open(page, '/about');
    await expect(page.getByText('CS50x: Intro to Computer Science')).toBeVisible();
    await expect(page.getByText('LinkedIn Learning Courses')).toBeVisible();
  });

  test('projects link to the stores and repositories', async ({ page }) => {
    await open(page, '/projects');
    await expect(page.getByRole('heading', { name: 'Vento: Riding Conditions' })).toBeVisible();
    const hrefs = await page.locator('a[target="_blank"]').evaluateAll((els) => els.map((a) => (a as HTMLAnchorElement).href));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        'https://apps.apple.com/us/app/vento-riding-conditions/id6762660260',
        'https://play.google.com/store/apps/details?id=com.galamor.VentoAntigravity',
        'https://ventoride.com/',
        'https://github.com/TuranAymis/llm-judge-chatbot-testing',
        'https://github.com/TuranAymis/ai-assisted-playwright-qa-framework',
        'https://github.com/TuranAymis/orbit-backend',
        'https://github.com/TuranAymis/orbit-web',
      ]),
    );
  });

  test('contact exposes the social and mail links', async ({ page }) => {
    await open(page, '/contact');
    const hrefs = await page.locator('a').evaluateAll((els) => els.map((a) => (a as HTMLAnchorElement).href));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        'https://github.com/TuranAymis',
        'https://www.linkedin.com/in/turan-aymis/',
        'https://medium.com/@turanaymis',
        'mailto:turanaymis@gmail.com',
      ]),
    );
  });
});

test.describe('language switch', () => {
  test('switching to Turkish translates navigation and content', async ({ page }) => {
    await open(page, '/');
    // The desktop top bar and the mobile header each have a language select; only one is visible.
    await page.locator('select:visible').first().selectOption('tr');
    // Client-side navigation keeps the selected language (the mobile sidebar is a hidden drawer).
    await page.evaluate(() => {
      window.history.pushState({}, '', '/experience');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await expect(page.locator('body')).toContainText('4 ülke sitesi');
    await expect(page.locator('body')).toContainText('Nis 2021');
  });
});

test.describe('boot intro', () => {
  test('plays on the first visit only', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('SYSTEM BOOT')).toBeVisible();
    await expect(page.locator('a[href="/about"]').first()).toBeAttached({ timeout: 10_000 });
    await page.reload();
    await expect(page.locator('a[href="/about"]').first()).toBeAttached();
    await expect(page.getByText('SYSTEM BOOT')).toHaveCount(0);
  });
});

test.describe('static assets', () => {
  test('resume.pdf is served as the current CV', async ({ request }) => {
    const res = await request.get('/resume.pdf');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
    expect((await res.body()).length).toBeGreaterThan(50_000);
  });

  test('robots.txt and sitemap.xml are served', async ({ request }) => {
    expect((await request.get('/robots.txt')).status()).toBe(200);
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('https://turanaymis.com/projects');
  });
});
