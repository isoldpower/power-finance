import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/entities/shadcn";

const financeAvatarVariants = cva("font-display font-semibold shadow-[0_2px_8px_var(--glow)]", {
	variants: {
		size: {
			sm: "size-8 text-[12px]",
			md: "size-[34px] text-[13px]",
			lg: "size-[38px] text-sm",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type FinanceAvatarProps = React.ComponentProps<typeof Avatar> &
	VariantProps<typeof financeAvatarVariants> & {
		initials: string
		src?: string
		alt?: string
	}

function FinanceAvatar({ className, size, initials, src, alt, ...props }: FinanceAvatarProps) {
	return (
		<Avatar className={cn(financeAvatarVariants({ size }), className)} {...props}>
			{src && <AvatarImage src={src} alt={alt ?? initials} />}
			<AvatarFallback className="bg-[image:var(--accent-grad)] text-white select-none">
				{initials}
			</AvatarFallback>
		</Avatar>
	);
}

export { FinanceAvatar, financeAvatarVariants };
export type { FinanceAvatarProps };
