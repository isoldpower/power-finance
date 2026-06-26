import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { UiCalendar } from "./Calendar.tsx";

const meta = {
	title: "Root/Calendar",
	component: UiCalendar,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: [
					"`UiCalendar` is an inline month grid for picking dates — a ref-forwarding wrapper around the shadcn Calendar (react-day-picker).",
					"Choose `mode` (`single`, `multiple` or `range`) and drive selection with `selected` + `onSelect`. For a compact field, mount it inside a `UiPopover` anchored to a button.",
				].join("\n\n"),
			},
		},
	},
	argTypes: {
		mode: {
			description: "Selection behaviour.",
			control: "inline-radio",
			options: ["single", "multiple", "range"],
			table: { defaultValue: { summary: "single" } },
		},
	},
} satisfies Meta<typeof UiCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: { docs: { description: { story: "Single-date selection, starting on today." } } },
	render: () => {
		const Demo = () => {
			const [date, setDate] = useState<Date | undefined>(new Date());
			return (
				<UiCalendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
			);
		};
		return <Demo />;
	},
};
