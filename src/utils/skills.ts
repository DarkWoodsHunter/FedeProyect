export interface Skill {
  skill: string;
  level: number;
}

const SKILLS_KEY = 'skills.v1';

export const DEFAULT_SKILLS: Skill[] = [
  { skill: 'Programming', level: 78 },
  { skill: 'Art', level: 28 },
  { skill: 'Design', level: 55 },
];

export const loadSkills = (): Skill[] => {
  try {
    const raw = localStorage.getItem(SKILLS_KEY);
    if (!raw) return [...DEFAULT_SKILLS];
    
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return [...DEFAULT_SKILLS];
    
    return parsed.map((s: any) => ({
      skill: String(s.skill ?? s.label ?? '').slice(0, 40) || 'Skill',
      level: Math.max(0, Math.min(100, Number(s.level ?? s.value ?? 0))),
    })).slice(0, 12);
  } catch {
    return [...DEFAULT_SKILLS];
  }
};

export const saveSkills = (skills: Skill[]): void => {
  try {
    localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
  } catch (err) {
    console.error('Error saving skills:', err);
  }
};

export const resetSkills = (): void => {
  localStorage.removeItem(SKILLS_KEY);
};

export const createEmptySkill = (): Skill => ({
  skill: 'New Skill',
  level: 50,
});

export const validateSkill = (skill: Skill): Skill => ({
  skill: skill.skill.trim() || 'Skill',
  level: Math.max(0, Math.min(100, skill.level)),
});