import type { GeneratedAssignment, GeneratedReadingDay } from './readingPlan/types';
import { formatGroupedReferences } from './bible/references';

export interface StudyBridgeOptions {
  day: GeneratedReadingDay;
  notes?: Record<string, string>; // assignmentId/ref -> note string
  includeInstructions?: boolean;
  customInstructions?: string;
}

export const DEFAULT_SCHOLARLY_INSTRUCTIONS = `You are acting as a careful, dispassionate biblical scholar.

Analyze the supplied passages on their own terms before introducing theological conclusions.

Distinguish clearly between:
- textual observation
- historical context
- literary structure
- lexical considerations
- intertextual connections
- theological interpretation
- later doctrinal synthesis

Where interpretations differ among reputable scholars, explain the major alternatives fairly.

Do not manufacture certainty where the text is ambiguous.

Identify repeated words, themes, structural patterns, contrasts, narrative movement, rhetorical devices, covenantal references, quotations, allusions, and important canonical connections.

When relevant, distinguish between what the original human author likely communicated to the initial audience and how later biblical texts develop or reuse the passage.

Prioritize careful exegesis over devotional speculation.`;

export const DEFAULT_STUDY_QUESTIONS = `## Study Questions

1. What is the main literary movement of today's passages?
2. What repeated themes appear across the four reading tracks?
3. Which historical or cultural details materially affect interpretation?
4. Which claims are explicit in the text, and which depend on inference?
5. What canonical connections deserve further investigation?
6. Where do respected interpretive traditions disagree?
7. What questions should be researched further?`;

export function generateStudyBriefMarkdown(options: StudyBridgeOptions): string {
  const { day, notes = {}, includeInstructions = true, customInstructions } = options;

  const ntAssignments = day.assignments.filter((a) => a.trackSlug === 'new_testament');
  const otAssignments = day.assignments.filter((a) => a.trackSlug === 'old_testament');
  const psalmsAssignments = day.assignments.filter((a) => a.trackSlug === 'psalms');
  const proverbsAssignments = day.assignments.filter((a) => a.trackSlug === 'proverbs');

  const ntFormatted = formatGroupedReferences(ntAssignments);
  const otFormatted = formatGroupedReferences(otAssignments);
  const psalmsFormatted = formatGroupedReferences(psalmsAssignments);
  const proverbsFormatted = formatGroupedReferences(proverbsAssignments);

  let md = `# Daily Scripture Study\n\n`;
  md += `**Date:** ${day.date} (Day ${day.dayNumber})\n\n`;

  md += `## Today's Reading\n\n`;

  if (ntFormatted.length > 0) {
    md += `### New Testament\n`;
    ntFormatted.forEach((ref) => (md += `- ${ref}\n`));
    md += `\n`;
  }

  if (otFormatted.length > 0) {
    md += `### Old Testament\n`;
    otFormatted.forEach((ref) => (md += `- ${ref}\n`));
    md += `\n`;
  }

  if (psalmsFormatted.length > 0) {
    md += `### Psalms\n`;
    psalmsFormatted.forEach((ref) => (md += `- ${ref}\n`));
    md += `\n`;
  }

  if (proverbsFormatted.length > 0) {
    md += `### Proverbs\n`;
    proverbsFormatted.forEach((ref) => (md += `- ${ref}\n`));
    md += `\n`;
  }

  md += `---\n\n`;

  if (includeInstructions) {
    md += `# Study Instructions\n\n`;
    md += `${customInstructions || DEFAULT_SCHOLARLY_INSTRUCTIONS}\n\n`;
    md += `${DEFAULT_STUDY_QUESTIONS}\n\n`;
    md += `---\n\n`;
  }

  md += `# Passage Material\n\n`;
  md += `*(Open assigned passages in YouVersion ESV or copy full text into this section for NotebookLM indexing)*\n\n`;

  day.assignments.forEach((assignment) => {
    const refKey = `${assignment.bookCode}.${assignment.chapter}`;
    md += `### ${refKey}\n`;
    const noteText = notes[assignment.id || refKey] || notes[refKey];
    if (noteText) {
      md += `*Note:* ${noteText}\n\n`;
    } else {
      md += `*(No specific notes entered)*\n\n`;
    }
  });

  md += `---\n\n`;
  md += `# Personal Notes\n\n`;

  const allNotesEntries = Object.entries(notes);
  if (allNotesEntries.length > 0) {
    allNotesEntries.forEach(([key, val]) => {
      if (val.trim()) {
        md += `- **${key}:** ${val.trim()}\n`;
      }
    });
  } else {
    md += `*(No personal notes for today)*\n`;
  }

  return md;
}

export function downloadMarkdownFile(content: string, filename: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function openNotebookLM(): void {
  if (typeof window === 'undefined') return;
  window.open('https://notebooklm.google.com/', '_blank', 'noopener,noreferrer');
}
