import BoardCapture from './BoardCapture';
import LiveTranscript from './LiveTranscript';
import LectureTimeline from './LectureTimeline';
import MarkdownNotes from './MarkdownNotes';
import DeviceConnection from './DeviceConnection';
import OfficeKitStatus from './OfficeKitStatus';
import ProcessingMonitor from './ProcessingMonitor';
import BottomStatusRail from './BottomStatusRail';

export default function LectureWorkspace({
  currentTime,
  selectedEventId,
  activeBoard,
  activeSpeech,
  boardChangeFlash,
  phiGenerating,
  onSelectEvent,
  onSeek,
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left — Timeline */}
        <aside className="hidden lg:flex w-[220px] xl:w-[240px] shrink-0 border-r border-airnote-border flex-col min-h-0">
          <LectureTimeline
            currentTime={currentTime}
            selectedEventId={selectedEventId}
            onSelectEvent={onSelectEvent}
            onSeek={onSeek}
          />
        </aside>

        {/* Center — Board + Transcript */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0 border-r border-airnote-border">
          <div className="flex-1 grid grid-rows-[1fr_auto] min-h-0">
            <div className="min-h-0 border-b border-airnote-border">
              <BoardCapture
                board={activeBoard}
                flash={boardChangeFlash}
                onBoardRefClick={onSeek}
              />
            </div>
            <div className="h-[160px] xl:h-[180px] shrink-0">
              <LiveTranscript speech={activeSpeech} />
            </div>
          </div>
        </main>

        {/* Right — Notes */}
        <aside className="hidden md:flex flex-1 max-w-[380px] xl:max-w-[420px] shrink-0 flex-col min-h-0">
          <MarkdownNotes
            phiGenerating={phiGenerating}
            activeBoard={activeBoard}
            onBoardRefClick={onSeek}
            highlightTime={currentTime}
          />
        </aside>

        {/* Far right — Device panel */}
        <aside className="hidden xl:flex w-[200px] shrink-0 flex-col gap-2 p-2 bg-airnote-bg/40 overflow-auto min-h-0">
          <DeviceConnection />
          <OfficeKitStatus />
          <ProcessingMonitor />
        </aside>
      </div>

      {/* Mobile timeline strip */}
      <div className="lg:hidden h-[140px] border-t border-airnote-border shrink-0">
        <LectureTimeline
          currentTime={currentTime}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
          onSeek={onSeek}
        />
      </div>

      <BottomStatusRail />
    </div>
  );
}
