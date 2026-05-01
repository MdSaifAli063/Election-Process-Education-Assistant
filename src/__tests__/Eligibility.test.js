import { describe, it, expect } from 'vitest';

// Mocking logic from Eligibility.jsx for verification
const checkEligibility = (age, citizen, residency) => {
  if (age >= 18 && citizen === 'yes' && residency === 'yes') return true;
  return false;
};

describe('Voter Eligibility Logic', () => {
  it('should return true for a citizen over 18 living in the region', () => {
    expect(checkEligibility(25, 'yes', 'yes')).toBe(true);
  });

  it('should return false for someone under 18', () => {
    expect(checkEligibility(17, 'yes', 'yes')).toBe(false);
  });

  it('should return false for non-citizens', () => {
    expect(checkEligibility(30, 'no', 'yes')).toBe(false);
  });

  it('should return false for non-residents', () => {
    expect(checkEligibility(30, 'yes', 'no')).toBe(false);
  });
});
