import type { CachesSnapshot } from "@shared/data";
import type { Goal } from "@entity/wallets";
import type { FetchGoalResponse } from "../../../goals-api";


type GoalCachesSnapshot = CachesSnapshot<Goal, FetchGoalResponse>;

export type { GoalCachesSnapshot };
