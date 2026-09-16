import { ApiError, apiErrorFromEnvelope, openSocket } from "@shared/api";

import { readQuota } from "./read-quota.ts";
import type { SocketConnection, SocketFrame, TokenSource } from "@shared/api";
import type { AssistantAcceptedDto, AssistantDeltaDto } from "../types.ts";
import type { AssistantSendResponse } from "./types.ts";


const ACCEPTED_EVENT = 'accepted';
const DELTA_EVENT = 'delta';
const MESSAGE_EVENT = 'message';
const ERROR_EVENT = 'error';

interface AdviceTurn {
	resolve: (reply: AssistantSendResponse) => void;
	reject: (error: ApiError) => void;
	onAccepted?: (accepted: AssistantAcceptedDto) => void;
	onDelta?: (delta: AssistantDeltaDto) => void;
}

interface AdviceSocketOptions {
	url: string;
	authorize?: TokenSource;
}

class AdviceSocket {
	private readonly options: AdviceSocketOptions;
	private connection: Promise<SocketConnection> | null = null;
	private readonly turns: AdviceTurn[] = [];

	constructor(options: AdviceSocketOptions) {
		this.options = options;
	}

	public async send(text: string, turn: Omit<AdviceTurn, 'resolve' | 'reject'>): Promise<AssistantSendResponse> {
		const connection = await this.connect();

		return new Promise<AssistantSendResponse>((resolve, reject) => {
			this.turns.push({ ...turn, resolve, reject });
			connection.send({ text });
		});
	}

	public close(): void {
		void this.connection?.then((connection) => { connection.close(); });
		this.connection = null;
	}

	private connect(): Promise<SocketConnection> {
		this.connection ??= openSocket({
			url: this.options.url,
			authorize: this.options.authorize,
		}, {
			onFrame: (frame) => { this.routeFrame(frame); },
			onError: (error) => { this.failActiveTurn(error); },
			onClose: () => { this.handleClose(); },
		}).catch((error: unknown) => {
			this.connection = null;

			throw error;
		});

		return this.connection;
	}

	private routeFrame(frame: SocketFrame): void {
		if (this.turns.length === 0) return;

		const turn = this.turns[0];

		if (frame.event === ACCEPTED_EVENT) {
			turn.onAccepted?.(frame.data as AssistantAcceptedDto);

			return;
		}

		if (frame.event === DELTA_EVENT) {
			turn.onDelta?.(frame.data as AssistantDeltaDto);

			return;
		}

		if (frame.event === MESSAGE_EVENT) {
			this.turns.shift();
			turn.resolve({
				message: frame.data as AssistantSendResponse['message'],
				quota: readQuota(frame.envelope),
			});

			return;
		}

		if (frame.event === ERROR_EVENT) {
			this.turns.shift();
			turn.reject(apiErrorFromEnvelope(
				{ error: frame.data },
				'The assistant could not answer',
			));
		}
	}

	private failActiveTurn(error: ApiError): void {
		if (this.turns.length === 0) return;

		this.turns.splice(0, 1)[0].reject(error);
	}

	private handleClose(): void {
		this.connection = null;

		while (this.turns.length > 0) {
			this.failActiveTurn(new ApiError(
				'assistant_unavailable',
				'The assistant socket closed before answering',
				{ enveloped: false },
			));
		}
	}
}

export { AdviceSocket };
export type { AdviceSocketOptions };
