import HeaderBar from './components/HeaderBar';
import LiveStatusBar from './components/LiveStatusBar';
import LectureWorkspace from './components/LectureWorkspace';
import LectureMemory from './components/LectureMemory';
import StudyLayer from './components/StudyLayer';
import { useLectureState } from './hooks/useLectureState';

export default function App() {
  const {
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
  } = useLectureState();

  return (
    <div className="h-screen flex flex-col bg-airnote-bg bg-grid bg-grid overflow-hidden">
      <HeaderBar
        currentTime={currentTime}
        onOpenStudy={() => setStudyOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <LiveStatusBar currentTime={currentTime} />

      {viewMode === 'workspace' ? (
        <LectureWorkspace
          currentTime={currentTime}
          selectedEventId={selectedEventId}
          activeBoard={activeBoard}
          activeSpeech={activeSpeech}
          boardChangeFlash={boardChangeFlash}
          phiGenerating={phiGenerating}
          onSelectEvent={selectEvent}
          onSeek={seekTo}
        />
      ) : (
        <LectureMemory
          currentTime={currentTime}
          onSeek={seekTo}
          onSelectBoard={seekTo}
        />
      )}

      <StudyLayer
        open={studyOpen}
        onClose={() => setStudyOpen(false)}
        activeIndex={activeFlashcard}
        setActiveIndex={setActiveFlashcard}
        revealedCards={revealedCards}
        toggleReveal={toggleReveal}
        onSeekToTimestamp={seekTo}
      />
    </div>
  );
}
