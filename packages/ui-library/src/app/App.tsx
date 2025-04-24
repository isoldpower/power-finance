import {
	LogoComponent,
	Separator,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarProvider, SidebarRail,
	useSidebar
} from "@/components";
import { SettingsProvider } from "@internal/shared";

import './styles.css';
import '@/styles/_index.css';

export default function Index() {
	return (
		<SettingsProvider>
			<SidebarProvider>
				<Temp />
			</SidebarProvider>
		</SettingsProvider>
	)
}

const Temp = () => {
	const { open } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="drop-shadow shadow-sm mb-4 p-4">
				<div className='flex justify-between items-center'>
					<LogoComponent withText={open} />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<div>content</div>
			</SidebarContent>
			<SidebarFooter>
				<Separator />
				<span className="text-xs text-muted-foreground">
							{open ? 'Dark Mode' : 'Dark'}
						</span>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}