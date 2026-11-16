const PENDING_CLASS = 'opacity-60 saturate-50 transition-[opacity,filter] duration-200';

const pendingClass = (pending: boolean | undefined): string => (pending === true ? PENDING_CLASS : '');

export { pendingClass };
