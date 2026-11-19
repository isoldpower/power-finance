import type { NodeColumn } from "../../layout";
import type { LabelSide } from "../types.ts";


const labelSideOf = (column: NodeColumn, compact: boolean): LabelSide => {
	if (compact) {
		return column === 'right' ? 'left' : 'right';
	}

	return column === 'left' ? 'left' : 'right';
};

export { labelSideOf };
