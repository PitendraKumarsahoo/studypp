export interface StudyNote {
  topicId: string;
  content: string;
  updatedAt: string;
}

const NOTES_STORAGE_KEY = 'dmlt_smart_study_notes_v1';

export function getAllTopicNotes(): Record<string, StudyNote> {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load notes from localStorage', e);
    return {};
  }
}

export function getTopicNote(topicId: string): string {
  const notes = getAllTopicNotes();
  return notes[topicId]?.content || '';
}

export function saveTopicNote(topicId: string, content: string): void {
  try {
    const notes = getAllTopicNotes();
    if (!content.trim()) {
      delete notes[topicId];
    } else {
      notes[topicId] = {
        topicId,
        content,
        updatedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    }
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent('dmlt-notes-updated', { detail: { topicId } }));
  } catch (e) {
    console.error('Failed to save note to localStorage', e);
  }
}

export function deleteTopicNote(topicId: string): void {
  try {
    const notes = getAllTopicNotes();
    delete notes[topicId];
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent('dmlt-notes-updated', { detail: { topicId } }));
  } catch (e) {
    console.error('Failed to delete note', e);
  }
}

export function hasTopicNote(topicId: string): boolean {
  const notes = getAllTopicNotes();
  return Boolean(notes[topicId] && notes[topicId].content.trim().length > 0);
}
