import { computeFieldStatus } from '../field-status.logic';
import { Stage } from '../../enums/Stage';
import { FieldStatus } from '../../enums/FieldStatus';

describe('computeFieldStatus', () => {
  const today = new Date();

  it('should return COMPLETED if stage is HARVESTED', () => {
    const result = computeFieldStatus(Stage.HARVESTED, today);
    expect(result).toBe(FieldStatus.COMPLETED);
  });

  it('should return AT_RISK if PLANTED > 30 days', () => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 31);
    const result = computeFieldStatus(Stage.PLANTED, pastDate);
    expect(result).toBe(FieldStatus.AT_RISK);
  });

  it('should return ACTIVE if PLANTED <= 30 days', () => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 10);
    const result = computeFieldStatus(Stage.PLANTED, pastDate);
    expect(result).toBe(FieldStatus.ACTIVE);
  });

  it('should return AT_RISK if GROWING > 60 days', () => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 61);
    const result = computeFieldStatus(Stage.GROWING, pastDate);
    expect(result).toBe(FieldStatus.AT_RISK);
  });

  it('should return ACTIVE if GROWING <= 60 days', () => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 50);
    const result = computeFieldStatus(Stage.GROWING, pastDate);
    expect(result).toBe(FieldStatus.ACTIVE);
  });

  it('should return AT_RISK if READY > 90 days', () => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 91);
    const result = computeFieldStatus(Stage.READY, pastDate);
    expect(result).toBe(FieldStatus.AT_RISK);
  });

  it('should return ACTIVE if READY <= 90 days', () => {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 80);
    const result = computeFieldStatus(Stage.READY, pastDate);
    expect(result).toBe(FieldStatus.ACTIVE);
  });
});
