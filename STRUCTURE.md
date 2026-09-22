# AirNote AI — Repository Directory Structure

This document outlines the directory structure and core architectural modules for the **AirNote AI** Android application (`Version-2.0`).

---

## 📂 Overview

```text
AirNote/
├── app/
│   ├── src/main/java/com/airnote/
│   │   ├── camera/        # Frame capture, delta detection & Occlusion Engine
│   │   ├── audio/         # On-device Speech-to-Text (ASR) processing
│   │   ├── fusion/        # Time-alignment & Fused Note Engine
│   │   └── ui/            # Jetpack Compose UI & Board Viewfinder
├── models/                # Quantized models & ONNX runtimes
└── docs/                  # Architecture specs & Pitch materials
```

---

## 🧩 Module Breakdown

### `app/src/main/java/com/airnote/`

* **`camera/`**
  * Manages the OpenCV / CameraX pipeline.
  * Handles real-time frame differencing to detect new content on the lecture board.
  * Runs the **Occlusion Engine** to ensure the instructor has stepped away before capturing a delta frame.

* **`audio/`**
  * Controls the microphone input and local audio buffering.
  * Interfaces with the on-device Whisper/ASR engine to transcribe spoken lectures with precise timestamps.

* **`fusion/`**
  * Core engine responsible for linking board updates with spoken audio.
  * Synchronizes board delta timestamp intervals with corresponding speech transcript chunks.
  * Formats and exports the integrated note output.

* **`ui/`**
  * Implemented using Jetpack Compose following Material 3 guidelines.
  * Contains the live camera viewfinder, board region overlay, note editor, and offline study assistant UI.

---

### `models/`
* Houses local model files (e.g., quantized ONNX / TFLite models for ASR, OCR, and local vector embeddings).
* Configured for zero-latency execution on the Snapdragon NPU.

---

### `docs/`
* Pitch presentation decks, architectural diagrams, and submission documentation for the iQOO Hackathon 2026.