import {HeaderBox, HeaderBoxOffset, List} from "@shared/components";
import {Link, Outlet} from "@tanstack/react-router";
import {getFinanceRoute} from "@internal/shared";
import type {FC} from "react";

const GlobalLayout: FC = () => {
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
					<div style={{ color: 'black' }}>
						Authentication
					</div>
				</div>
			</HeaderBox>
			<HeaderBoxOffset>
				<Outlet />
			</HeaderBoxOffset>
		</>
	)
}

export { GlobalLayout };