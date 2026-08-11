
import { BranchIcon } from "@shared/pure-components/icons";
import { WhatIfContainer } from "./WhatIfContainer.tsx";
import { WhatIfHead } from "./WhatIfHead.tsx";
import { WhatIfDescription } from "./WhatIfDescription.tsx";
import { WhatIfExample } from "./WhatIfExample.tsx";
import { WhatIfNotifyButton } from "./WhatIfNotifyButton.tsx";


function WhatIf() {
	return null;
}

WhatIf.displayName = 'WhatIf';
WhatIf.Container = WhatIfContainer;
WhatIf.Head = WhatIfHead;
WhatIf.Icon = BranchIcon;
WhatIf.Description = WhatIfDescription;
WhatIf.Example = WhatIfExample;
WhatIf.NotifyButton = WhatIfNotifyButton;

export { WhatIf };
