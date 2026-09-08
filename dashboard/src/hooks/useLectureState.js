import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LECTURE_META,
  getBoardAtTime,
  getSpeechAtTime,
  TIMELINE_EVENTS,
} from '../data/mockLecture';

export function useLectureState() {
  const [currentTime, setCurrentTime] = useState(LECTURE_META.currentTime);
  const [selectedEventId, setSelectedEventId] = useState('evt-14');
  const [viewMode, setViewMode] = useState('workspace'); // 'workspace' | 'memory'
  const [studyOpen, setStudyOpen] = useState(false);
  const [boardChangeFlash, setBoardChangeFlash] = useState(false);
  const [phiGenerating, setPhiGenerating] = useState(true);
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [activeFlashcard, setActiveFlashcard] = useState(0);

  const activeBoard = useMemo(() => getBoardAtTime(currentTime), [currentTime]);
  const activeSpeech = useMemo(() => getSpeechAtTime(currentTime), [currentTime]);

  const selectEvent = useCallback((event) => {
    setSelectedEventId(event.id);
    setCurrentTime(event.timestamp);
    if (event.type === 'board') {
      setBoardChangeFlash(true);
      setTimeout(() => setBoardChangeFlash(false), 600);
    }
  }, []);

  const seekTo = useCallback((time) => {
    setCurrentTime(time);
    const nearest = TIMELINE_EVENTS.reduce((best, evt) =>
      Math.abs(evt.timestamp - time) < Math.abs(best.timestamp - time) ? evt : best,
    );
    setSelectedEventId(nearest.id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((t) => Math.min(t + 1, LECTURE_META.totalDuration));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhiGenerating(false), 3000);
    return () => clearTimeout(t);
  }, [currentTime]);

  const toggleReveal = useCallback((id) => {
    setRevealedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return {
    currentTime,
    selectedEventId,
    viewMode,
    setViewMode,
    studyOpen,
    setStudyOpen,
    boardChangeFlash,
    phiGenerating,
    revealedCards,
    activeFlashcard,
    setActiveFlashcard,
    activeBoard,
    activeSpeech,
    selectEvent,
    seekTo,
    toggleReveal,
    lectureMeta: LECTURE_META,
  };
}
