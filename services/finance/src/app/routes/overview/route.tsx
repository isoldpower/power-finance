import {createFileRoute, Link, Outlet} from '@tanstack/react-router'
import {HeaderAuthentication} from "@widget/auth";
import {HeaderBox, HeaderBoxOffset, List} from "@shared/components";
import {getFinanceRoute} from "@internal/shared";

export const Route = createFileRoute('/overview')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HeaderBox>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%'
				}}>
					<List style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
						<Link to={getFinanceRoute('overview')}>
							Overview
						</Link>
						<Link to={'/overview/protected'}>
							Protected
						</Link>
					</List>
					<HeaderAuthentication />
				</div>
			</HeaderBox>
			<HeaderBoxOffset>
				<Outlet />
			</HeaderBoxOffset>
		</>
	)
}
