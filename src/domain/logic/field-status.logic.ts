import { Stage } from "../enums/Stage";
import { FieldStatus } from "../enums/FieldStatus";

export function computeFieldStatus(
  stage: Stage,
  plantingDate: Date
): FieldStatus {
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
