import {createFileRoute, Outlet, redirect, useLocation} from '@tanstack/react-router'
import {BreadcrumbsHeader} from "@shared/components/BreadcrumbsHeader.tsx";
import {useEffect} from "react";

export const Route = createFileRoute('/auth/_layout')({
	component: RouteComponent
})

function RouteComponent() {
	const { pathname } = useLocation();
	useEffect(() => {
		console.log(pathname);
		if (pathname === '/auth') {
			redirect({
				to: '/auth/login',
				replace: true
			});
		}
	}, [pathname]);

	return (
		<>
			<BreadcrumbsHeader />
			<Outlet />
		</>
	)
}
