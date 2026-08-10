import { BranchIcon } from "../icons";

import { WhatIfContainer } from "./WhatIfContainer.tsx";
import { WhatIfHead } from "./WhatIfHead.tsx";
import { WhatIfTitle } from "./WhatIfTitle.tsx";
import { WhatIfDescription } from "./WhatIfDescription.tsx";
import { WhatIfExample } from "./WhatIfExample.tsx";
import { WhatIfExampleText } from "./WhatIfExampleText.tsx";
import { WhatIfHighlight } from "./WhatIfHighlight.tsx";
import { WhatIfNotifyButton } from "./WhatIfNotifyButton.tsx";


function WhatIf() {
	return null;
}

WhatIf.displayName = 'WhatIf';
WhatIf.Container = WhatIfContainer;
WhatIf.Head = WhatIfHead;
WhatIf.Icon = BranchIcon;
WhatIf.Title = WhatIfTitle;
WhatIf.Description = WhatIfDescription;
WhatIf.Example = WhatIfExample;
WhatIf.ExampleText = WhatIfExampleText;
WhatIf.Highlight = WhatIfHighlight;
WhatIf.NotifyButton = WhatIfNotifyButton;

export { WhatIf };
