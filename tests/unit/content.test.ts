import { existsSync, readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CONTENT, SKILLS } from '../../data/content';

const en = CONTENT.en;
const tr = CONTENT.tr;

describe('translations', () => {
  it('has the same keys in English and Turkish', () => {
    expect(Object.keys(tr.translations).sort()).toEqual(Object.keys(en.translations).sort());
  });

  it('has no empty translation values', () => {
    for (const [lang, data] of Object.entries(CONTENT)) {
      for (const [key, value] of Object.entries(data.translations)) {
        if (typeof value === 'string') {
          expect(value.trim(), `${lang}.${key}`).not.toBe('');
        }
      }
    }
  });

  it('presents the current seniority and experience', () => {
    expect(en.translations.role).toContain('Senior Software QA Engineer');
    expect(tr.translations.role).toContain('Kıdemli');
    expect(en.translations.summary).toMatch(/7\+ years/);
    expect(tr.translations.summary).toMatch(/7\+ yıl/);
  });
});

describe('experience', () => {
  it('lists the same employers in the same order for both languages', () => {
    expect(tr.experience.map((e) => e.id)).toEqual(en.experience.map((e) => e.id));
    expect(en.experience.map((e) => e.id)).toEqual(['monster', 'dogus', 'akbank']);
  });

  it('matches the CV dates', () => {
    const byId = Object.fromEntries(en.experience.map((e) => [e.id, e]));
    expect(byId['monster']?.period).toBe('Sep 2021 – Present');
    expect(byId['dogus']?.period).toBe('May 2021 – Sep 2021');
    expect(byId['akbank']?.period).toBe('Sep 2018 – Apr 2021');
  });

  it('has the same number of bullet points in both languages', () => {
    en.experience.forEach((item, i) => {
      expect(tr.experience[i]?.description.length, item.id).toBe(item.description.length);
    });
  });
});

describe('projects', () => {
  it('has the same projects in both languages', () => {
    expect(tr.projects.map((p) => p.id)).toEqual(en.projects.map((p) => p.id));
  });

  it('has valid, absolute https links', () => {
    for (const project of [...en.projects, ...tr.projects]) {
      expect(project.links.length, project.id).toBeGreaterThan(0);
      for (const link of project.links) {
        expect(link.url, `${project.id} ${link.type}`).toMatch(/^https:\/\//);
        if (link.type === 'github') {
          expect(link.url, project.id).toMatch(/^https:\/\/github\.com\/TuranAymis\//);
        }
      }
    }
  });

  it('links the shipped Vento app to both stores', () => {
    const vento = en.projects.find((p) => p.id === 'vento');
    expect(vento?.links.map((l) => l.type)).toEqual(expect.arrayContaining(['ios', 'android', 'website']));
  });
});

describe('skills', () => {
  it('has unique ids and levels between 0 and 100', () => {
    const ids = SKILLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const skill of SKILLS) {
      expect(skill.level, skill.id).toBeGreaterThanOrEqual(0);
      expect(skill.level, skill.id).toBeLessThanOrEqual(100);
    }
  });

  it('includes the skills listed on the CV', () => {
    const names = SKILLS.map((s) => s.name);
    for (const expected of ['Playwright', 'Selenium', 'Appium', 'Pytest', 'Allure Report', 'GitHub Actions', 'TypeScript']) {
      expect(names).toContain(expected);
    }
  });
});

describe('static assets', () => {
  it('ships the resume as a real PDF', () => {
    const file = 'public/resume.pdf';
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file).subarray(0, 4).toString()).toBe('%PDF');
    expect(statSync(file).size).toBeGreaterThan(50_000);
  });

  it('lists every route in the sitemap', () => {
    const sitemap = readFileSync('public/sitemap.xml', 'utf-8');
    for (const path of ['', 'about', 'skills', 'experience', 'projects', 'contact']) {
      expect(sitemap).toContain(`<loc>https://turanaymis.com/${path}</loc>`);
    }
  });

  it('does not ship a static canonical that would conflict with per-page SEO tags', () => {
    expect(readFileSync('index.html', 'utf-8')).not.toMatch(/rel="canonical"/);
  });
});
