// Static build for Cloudflare Pages.
// Usage: npm install && node build-cloudflare.mjs  ->  upload the "cloudflare" folder.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const origin = process.env.SITE_ORIGIN ?? 'https://www.twcoaching.ch';
fs.rmSync('dist', { recursive: true, force: true });
execSync('npx react-router build', {
	cwd: 'apps/web',
	stdio: 'inherit',
	env: { ...process.env, NODE_ENV: 'production', STATIC_EXPORT: '1', PREVIEW_HOST: '127.0.0.1', SITE_ORIGIN: origin, ECOMMERCE_GA_ID: process.env.ECOMMERCE_GA_ID ?? 'G-9RVR4HKWEQ' },
});

const out = 'cloudflare';
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync('dist/apps/web/client', out, { recursive: true });

// Cloudflare Pages serves /page from page.html, which keeps the URLs without a trailing slash.
const flatten = dir => {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (!entry.isDirectory() || entry.name === 'assets') continue;
		flatten(full);
		const index = path.join(full, 'index.html');
		if (fs.existsSync(index)) {
			fs.renameSync(index, `${full}.html`);
			if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
		}
	}
};
flatten(out);
const fallback = path.join(out, '__spa-fallback.html');
if (fs.existsSync(fallback)) fs.renameSync(fallback, path.join(out, '404.html'));
console.log(`\nReady: upload the "${out}" folder to Cloudflare Pages (${origin}).`);
