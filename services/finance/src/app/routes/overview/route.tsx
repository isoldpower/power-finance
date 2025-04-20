import {createFileRoute} from '@tanstack/react-router'
import {GlobalLayout} from "@widget/global-layout";
import { LayoutPending, LayoutError } from "@feature/layout-fx";

export const Route = createFileRoute('/overview')({
	component: GlobalLayout,
	errorComponent: LayoutError,
	pendingComponent: LayoutPending
})