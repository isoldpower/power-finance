const NoActivityPlaceholder = () => {
	return (
		<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5">
			<div className="size-[30px] flex-none rounded-[8px] border border-dashed border-border-strong" />
			<div className="min-w-0 flex-1 relative">
				<div className="text-[13px] font-medium text-text-3 opacity-50">
					&nbsp;
				</div>
				<div className="text-[11px] text-text-3">
					&nbsp;
				</div>
				<div className='absolute flex flex-col items-center justify-center top-0 bottom-0 left-0'>
					<div className="text-[13px] font-medium text-text-3 opacity-50">
						No activity yet
					</div>
				</div>
			</div>
		</div>
	);
}

export { NoActivityPlaceholder };