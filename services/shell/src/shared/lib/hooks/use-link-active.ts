import {useLocation} from "@tanstack/react-router";
import {useMemo} from "react";

interface UseLinkActiveOptions {
  deepLink?: boolean;
}

const useLinkActive = (
  to: string,
  options: UseLinkActiveOptions = {}
) => {
  const {pathname} = useLocation();

  return useMemo(() => {
	let cleanPathname = pathname.trim();
	let cleanLink = to.trim();

	if (cleanLink.startsWith('/')) cleanLink = cleanLink.slice(1);
	if (cleanLink.endsWith('/')) cleanLink = cleanLink.slice(0, -1);

	if (cleanPathname.startsWith('/')) cleanPathname = cleanPathname.slice(1);
	if (cleanPathname.endsWith('/')) cleanPathname = cleanPathname.slice(0, -1);

	return options.deepLink ? cleanPathname.includes(cleanLink) : cleanPathname === cleanLink;
  }, [pathname, to, options]);
}

export { useLinkActive };
export type { UseLinkActiveOptions };