"""Extract Whisper-ready audio from classroom video files using FFmpeg."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

DEFAULT_OUTPUT_FILENAME = "lecture_audio.wav"
SAMPLE_RATE = 16000
AUDIO_CODEC = "pcm_s16le"


class AudioExtractionError(Exception):
    """Base error for audio extraction failures."""


class FFmpegNotFoundError(AudioExtractionError):
    """Raised when FFmpeg is not available on the system PATH."""


class InvalidVideoError(AudioExtractionError):
    """Raised when the input file is missing, unreadable, or not a valid video."""


class NoAudioTrackError(AudioExtractionError):
    """Raised when the video file does not contain an audio stream."""


def _resolve_tool(name: str) -> str:
    path = shutil.which(name)
    if path is None:
        raise FFmpegNotFoundError(
            f"{name} was not found on PATH. Install FFmpeg and ensure it is available."
        )
    return path


def _run_command(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        capture_output=True,
        text=True,
        check=False,
    )


def _validate_video_file(video_path: Path, ffprobe: str) -> None:
    if not video_path.exists():
        raise InvalidVideoError(f"Video file not found: {video_path}")

    if not video_path.is_file():
        raise InvalidVideoError(f"Input path is not a file: {video_path}")

    result = _run_command(
        [
            ffprobe,
            "-v",
            "error",
            "-show_entries",
            "format=format_name",
            "-of",
            "default=nw=1:nk=1",
            str(video_path),
        ]
    )

    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "Unknown ffprobe error.").strip()
        raise InvalidVideoError(f"Invalid or corrupted video file: {video_path}\n{detail}")


def _video_has_audio(video_path: Path, ffprobe: str) -> bool:
    result = _run_command(
        [
            ffprobe,
            "-v",
            "error",
            "-select_streams",
            "a",
            "-show_entries",
            "stream=index",
            "-of",
            "csv=p=0",
            str(video_path),
        ]
    )

    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "Unknown ffprobe error.").strip()
        raise InvalidVideoError(f"Could not inspect video file: {video_path}\n{detail}")

    return bool(result.stdout.strip())


def extract_lecture_audio(
    video_path: str | Path,
    output_path: str | Path | None = None,
) -> Path:
    """
    Extract mono 16 kHz PCM WAV audio from a classroom video.

    The returned WAV is suitable as input for Whisper-Tiny-INT8 in a later pipeline stage.
    The original video file is never modified or deleted.
    """
    ffmpeg = _resolve_tool("ffmpeg")
    ffprobe = _resolve_tool("ffprobe")

    source = Path(video_path).expanduser().resolve()
    destination = (
        Path(output_path).expanduser().resolve()
        if output_path is not None
        else source.parent / DEFAULT_OUTPUT_FILENAME
    )

    _validate_video_file(source, ffprobe)

    if not _video_has_audio(source, ffprobe):
        raise NoAudioTrackError(f"Video has no audio track: {source}")

    destination.parent.mkdir(parents=True, exist_ok=True)

    result = _run_command(
        [
            ffmpeg,
            "-y",
            "-i",
            str(source),
            "-vn",
            "-ac",
            "1",
            "-ar",
            str(SAMPLE_RATE),
            "-c:a",
            AUDIO_CODEC,
            str(destination),
        ]
    )

    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "Unknown ffmpeg error.").strip()
        raise AudioExtractionError(
            f"Failed to extract audio from {source}.\n{detail}"
        )

    if not destination.is_file() or destination.stat().st_size == 0:
        raise AudioExtractionError(
            f"Audio extraction completed but output file is missing or empty: {destination}"
        )

    return destination


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Extract mono 16 kHz PCM WAV audio from a classroom video for the AirNote AI pipeline."
        )
    )
    parser.add_argument(
        "video",
        help="Path to the input classroom video file (for example, classroom_video.mp4).",
    )
    parser.add_argument(
        "-o",
        "--output",
        default=None,
        help=(
            f"Output WAV path (default: lecture_audio.wav in the same directory as the video)."
        ),
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)

    try:
        output_file = extract_lecture_audio(args.video, args.output)
    except AudioExtractionError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Success: extracted audio to {output_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
