import { FC, ReactNode } from "react";


interface LandingSectionShellProps {
	title: ReactNode;
	description: ReactNode;
	badge: string;
	children: ReactNode;
}

const LandingSectionShell: FC<LandingSectionShellProps> = ({
	title,
	description,
	badge,
	children
}) => {
	return (
		<section className="flex justify-around w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-6 text-center">
					<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
						{badge}
					</div>
					{typeof title === 'string' ? (
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							{title}
						</h2>
					) : title}
					{typeof description === 'string' ? (
						<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							{description}
						</p>
					) : description}
				</div>
				<div className="flex flex-col gap-6 items-center pt-6">
					{children}
				</div>
			</div>
		</section>
	)
}

LandingSectionShell.displayName = 'LandingSectionShell';

export { LandingSectionShell };