import type { FC } from "react";

import { InitialRecoveryForm } from "@widget/auth";
import { FormWizard } from "@shared/components";
import {FormPaper} from "@entity/auth/recovery-form/FormPaper.tsx";
import {FormHead} from "@entity/auth/recovery-form/FormHead.tsx";
import {FormLogo} from "@entity/auth/recovery-form/FormLogo.tsx";
import {FormTitle} from "@entity/auth/recovery-form/FormTitle.tsx";
import {FormParagraph} from "@entity/auth/recovery-form/FormParagraph.tsx";
import {ResetRecoveryForm} from "@widget/auth/recovery-form/ResetRecoveryForm.tsx";

interface RecoveryPageProps {}

const RecoveryPage: FC<RecoveryPageProps> = () => {
	return (
		<FormWizard>
			<FormPaper>
				<FormHead>
					<div className="flex justify-center items-center">
						<FormLogo />
					</div>
					<div className="flex flex-col gap-1">
						<FormTitle>
							Account Recovery
						</FormTitle>
						<FormParagraph>
							Help us identify your account and verify your identity.
						</FormParagraph>
					</div>
				</FormHead>
				<InitialRecoveryForm />
				<ResetRecoveryForm />
			</FormPaper>
		</FormWizard>
	)
}

RecoveryPage.displayName = 'RecoveryPage';

export { RecoveryPage };
export type { RecoveryPageProps };