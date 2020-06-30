export default function( routes ) {
	const breadcrumbs = [
		{ path: '/', breadcrumbName: 'Home' },
	];

	return [
		...breadcrumbs,
		...routes,
	];
}
