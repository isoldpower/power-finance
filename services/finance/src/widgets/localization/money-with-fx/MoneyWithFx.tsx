import { useConvertMoney } from "@feature/localization";
import { AnimatedMoney } from "@entity/localization";
import { useMemo } from "react";
import type { Money } from "@entity/localization";
import type { FC } from "react";


interface MoneyWithFxProps {
	money: Money | undefined;
	isPending: boolean;
}

const MoneyWithFx: FC<MoneyWithFxProps> = ({
	money,
	isPending,
}) => {
	const { convert } = useConvertMoney();
	const placeholder = useMemo(() => {
		return isPending ? '…' : '—';
	}, [isPending]);
	const moneyConverted = useMemo(() => {
		return money ? convert(money) : null;
	}, [convert, money]);

	return moneyConverted ? (
		<AnimatedMoney bare amount={moneyConverted.amount} currency={moneyConverted.currency} />
	) : placeholder;
};

export { MoneyWithFx };