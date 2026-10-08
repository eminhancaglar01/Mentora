import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSkillMastery,
  getMasteryStatus,
  calculateOverallMastery,
  estimateLGSScore,
  calculateErrorDNA,
  recommendNextSkill,
  calculateTargetGap,
  selectNextPracticeQuestion,
} from '../lib/learning/mastery.ts';
import type { Skill, HistoricalAnswer, Question } from '../types/index.ts';

test('calculateSkillMastery increases on correct answers with difficulty weight', () => {
  const initial = 50;
  const afterEasy = calculateSkillMastery(initial, true, 1);
  const afterHard = calculateSkillMastery(initial, true, 5);

  assert.ok(afterEasy > initial, 'Easy correct should increase mastery');
  assert.ok(afterHard > afterEasy, 'Hard question should yield higher increase');
  assert.ok(afterHard <= 100, 'Score should not exceed 100');
});

test('calculateSkillMastery penalizes errors more severely on easy questions', () => {
  const initial = 70;
  const afterEasyError = calculateSkillMastery(initial, false, 1);
  const afterHardError = calculateSkillMastery(initial, false, 5);

  assert.ok(afterEasyError < initial, 'Error should decrease mastery');
  assert.ok(afterHardError < initial, 'Hard error should decrease mastery');
  assert.ok(afterEasyError < afterHardError, 'Making an error on easy question is penalized more');
});

test('getMasteryStatus maps ranges correctly', () => {
  assert.equal(getMasteryStatus(95), 'mastered');
  assert.equal(getMasteryStatus(85), 'mastered');
  assert.equal(getMasteryStatus(75), 'strong');
  assert.equal(getMasteryStatus(50), 'developing');
  assert.equal(getMasteryStatus(40), 'at-risk');
  assert.equal(getMasteryStatus(10), 'at-risk');
});

test('calculateOverallMastery averages skill scores', () => {
  const mockSkills = [
    { masteryScore: 90 },
    { masteryScore: 80 },
    { masteryScore: 70 },
  ] as Skill[];

  assert.equal(calculateOverallMastery(mockSkills), 80);
});

test('estimateLGSScore predicts score based on mastery', () => {
  const skillsHigh = [{ masteryScore: 90 }, { masteryScore: 90 }] as Skill[];
  const skillsLow = [{ masteryScore: 30 }, { masteryScore: 30 }] as Skill[];

  const scoreHigh = estimateLGSScore(skillsHigh, 450);
  const scoreLow = estimateLGSScore(skillsLow, 450);

  assert.ok(scoreHigh > scoreLow);
  assert.ok(scoreHigh >= 400 && scoreHigh <= 500);
});

test('calculateErrorDNA aggregates error categories properly', () => {
  const answers: HistoricalAnswer[] = [
    { id: '1', questionId: 'q1', skillId: 's1', isCorrect: false, selectedAnswer: 'B', timeSpentSec: 45, errorTag: 'islem_hatasi', timestamp: '', difficulty: 2 },
    { id: '2', questionId: 'q2', skillId: 's1', isCorrect: false, selectedAnswer: 'C', timeSpentSec: 40, errorTag: 'islem_hatasi', timestamp: '', difficulty: 2 },
    { id: '3', questionId: 'q3', skillId: 's1', isCorrect: false, selectedAnswer: 'A', timeSpentSec: 50, errorTag: 'kavram_eksigi', timestamp: '', difficulty: 3 },
    { id: '4', questionId: 'q4', skillId: 's1', isCorrect: true, selectedAnswer: 'D', timeSpentSec: 30, timestamp: '', difficulty: 2 },
  ];

  const dna = calculateErrorDNA(answers);
  assert.equal(dna.totalAnalyzed, 3);
  assert.equal(dna.mostFrequent, 'islem_hatasi');
  
  const islemItem = dna.items.find(i => i.type === 'islem_hatasi');
  assert.ok(islemItem);
  assert.equal(islemItem.count, 2);
  assert.equal(islemItem.percentage, 67);
});

test('recommendNextSkill prioritizes high-yield gap topic', () => {
  const skills: Skill[] = [
    { id: 'radicals', mebCode: 'M.8.1.3', title: 'Kareköklü İfadeler', masteryScore: 43, category: 'Sayılar', grade: 8, order: 3, description: '', prerequisites: [], status: 'at-risk', questionsCount: 20 },
    { id: 'exponents', mebCode: 'M.8.1.2', title: 'Üslü İfadeler', masteryScore: 92, category: 'Sayılar', grade: 8, order: 2, description: '', prerequisites: [], status: 'mastered', questionsCount: 20 },
  ];

  const rec = recommendNextSkill(skills, 450);
  assert.equal(rec.skillId, 'radicals');
  assert.equal(rec.skillTitle, 'Kareköklü İfadeler');
  assert.ok(rec.expectedScoreImpact > 0);
});

test('calculateTargetGap calculates remaining points', () => {
  assert.equal(calculateTargetGap(412, 450), 38);
  assert.equal(calculateTargetGap(460, 450), 0);
});

test('selectNextPracticeQuestion chooses question aligned with current mastery', () => {
  const questions: Question[] = [
    { id: 'q-easy', skillId: 'radicals', subject: 'Matematik', grade: 8, difficulty: 1, questionText: 'Easy', choices: [], correctAnswer: 'A', explanation: '', misconception: '', errorTag: 'islem_hatasi', estimatedTimeSec: 60 },
    { id: 'q-hard', skillId: 'radicals', subject: 'Matematik', grade: 8, difficulty: 5, questionText: 'Hard', choices: [], correctAnswer: 'A', explanation: '', misconception: '', errorTag: 'kavram_eksigi', estimatedTimeSec: 120 },
  ];

  const pickedForBeginner = selectNextPracticeQuestion(questions, 'radicals', 30);
  assert.equal(pickedForBeginner?.id, 'q-easy');

  const pickedForMaster = selectNextPracticeQuestion(questions, 'radicals', 95);
  assert.equal(pickedForMaster?.id, 'q-hard');
});
