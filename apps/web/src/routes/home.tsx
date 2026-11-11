import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { TwApp } from '@/components/tw-app';

const OG_IMAGE =
	'/images/logo-tw.png';

const jsonLd = [
	{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'TW Coaching',
		url: 'https://www.twcoaching.ch/',
	},
	{
		'@context': 'https://schema.org',
		'@type': 'HealthAndBeautyBusiness',
		name: 'TW Coaching',
		url: 'https://www.twcoaching.ch/',
		description:
			"Coach personnel diplômé à Genève. Coaching premium pour la perte de poids, la prise de masse, la vitesse et l'endurance.",
		telephone: '+41 76 458 08 27',
		email: 'info@twcoaching.ch',
		areaServed: 'Genève, Suisse',
		sameAs: ['https://www.instagram.com/tw.coaching_'],
	},
];

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'TW Coaching — Coaching premium à Genève',
		description:
			'Coach personnel diplômé à Genève. Perte de poids, prise de masse, vitesse et endurance. Réservez votre séance avec TW Coaching.',
		image: OG_IMAGE,
		jsonLd,
	});
}

export default function Home() {
	return <TwApp />;
}
