import type { Config } from '@react-router/dev/config';

// Static build for Cloudflare Pages when STATIC_EXPORT is set; the original Node server build otherwise.
const isStatic = Boolean(process.env.STATIC_EXPORT);

export default {
	appDirectory: 'src',
	buildDirectory: '../../dist/apps/web',
	ssr: !isStatic,
	...(isStatic ? { prerender: ['/', '/sitemap.xml', '/robots.txt'] } : {}),
} satisfies Config;
