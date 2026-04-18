import { Stage } from '../enums/Stage';
import { FieldStatus } from '../enums/FieldStatus';

/**
 * Computes the status of a field based on its current stage and planting date.
 *
 * Rules:
 * - If stage is HARVESTED -> COMPLETED
 * - If stage is PLANTED and >30 days since planting -> AT_RISK
 * - If stage is GROWING and >60 days since planting -> AT_RISK
 * - If stage is READY and >90 days since planting -> AT_RISK
 * - Otherwise -> ACTIVE
 */
export function computeFieldStatus(stage: Stage, plantingDate: Date): FieldStatus {
  const today = new Date();
  const daysSincePlanting = Math.floor(
    (today.getTime() - plantingDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (stage === Stage.HARVESTED) {
    return FieldStatus.COMPLETED;
  }

  const riskThresholds: Record<Exclude<Stage, Stage.HARVESTED>, number> = {
    [Stage.PLANTED]: 30,
    [Stage.GROWING]: 60,
    [Stage.READY]: 90,
  };

  if (daysSincePlanting > riskThresholds[stage]) {
    return FieldStatus.AT_RISK;
  }

  return FieldStatus.ACTIVE;
}
