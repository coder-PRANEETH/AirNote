# AirNote AI — Version 2.0 🚀

> **iQOO Hackathon 2026 Submission**  
> *A photo saves the final board. AirNote saves the way the teacher got there.*

[![Hackathon](https://img.shields.io/badge/iQOO--Hackathon-2026-blue)](https://github.com/Mithil-7/AirNote/tree/Version-2.0)
[![Branch](https://img.shields.io/badge/Branch-Version--2.0-indigo)](#)
[![On-Device](https://img.shields.io/badge/Compute-100%25%20On--Device%20NPU-success)](#)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](#)

---

## 📌 Overview

In fast, equation-dense lectures (JEE/NEET coaching, STEM degrees), students face an impossible tradeoff: **copy the board or listen to the explanation**. Doing both leads to missing half of each. 

Existing solutions fail in isolated silos:
* **Photo Scanners:** Save only the static, final state after intermediate steps are erased.
* **Audio Recorders:** Provide contextless transcripts without visual board synchronization.

**AirNote AI** bridges this gap. Running entirely on-device via the Snapdragon NPU, AirNote monitors the lecture board, detects new lines the moment they appear (occlusion-aware), and **fuses the exact sentence spoken by the instructor to the specific equation written on the board**.

---

## ✨ Key Features (v2.0)

* **📸 Occlusion-Aware Delta Detection:** Captures board updates only after the instructor steps away from the frame.
* **🎙️ Spoken-Context Fusion:** Time-aligns real-time on-device ASR (speech-to-text) directly to board step deltas.
* **📐 Equation & Math OCR:** Renders handwritten chalkboard math into clean LaTeX structures.
* **🧠 Conversational Study Layer (Stretch Goal):** Offline, on-device RAG enabling students to ask questions like *"What did sir say about eigenvalues?"* answered directly from their own lecture data.
* **🔒 100% On-Device & Private:** Zero internet required, zero cloud API latency, and zero recurring per-student costs. Built for tier-2/3 Indian classrooms with spotty connectivity.

---

## 🏗️ Architecture Flow

```text
[ Camera Preview ] ---> [ Frame Differencing ] ---> [ Occlusion Check ]
                                                               |
                                                     (Board Delta Captured)
                                                               |
[ On-Device Speech ] -> [ Timestamp Alignment ] ----> [ Fused Note Engine ]
                                                               |
                                                     [ Local Vector Store ]
                                                               |
                                                     [ Offline RAG / Tutor ]




Here is the updated, production-ready `README.md` structured specifically for the `Version-2.0` branch of your repository (`Mithil-7/AirNote`).

Copy and paste this directly into your `README.md` file on the `Version-2.0` branch:

```markdown
# AirNote AI — Version 2.0 🚀

> **iQOO Hackathon 2026 Submission**  
> *A photo saves the final board. AirNote saves the way the teacher got there.*

[![Hackathon](https://img.shields.io/badge/iQOO--Hackathon-2026-blue)](https://github.com/Mithil-7/AirNote/tree/Version-2.0)
[![Branch](https://img.shields.io/badge/Branch-Version--2.0-indigo)](#)
[![On-Device](https://img.shields.io/badge/Compute-100%25%20On--Device%20NPU-success)](#)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](#)

---

## 📌 Overview

In fast, equation-dense lectures (JEE/NEET coaching, STEM degrees), students face an impossible tradeoff: **copy the board or listen to the explanation**. Doing both leads to missing half of each. 

Existing solutions fail in isolated silos:
* **Photo Scanners:** Save only the static, final state after intermediate steps are erased.
* **Audio Recorders:** Provide contextless transcripts without visual board synchronization.

**AirNote AI** bridges this gap. Running entirely on-device via the Snapdragon NPU, AirNote monitors the lecture board, detects new lines the moment they appear (occlusion-aware), and **fuses the exact sentence spoken by the instructor to the specific equation written on the board**.

---

## ✨ Key Features (v2.0)

* **📸 Occlusion-Aware Delta Detection:** Captures board updates only after the instructor steps away from the frame.
* **🎙️ Spoken-Context Fusion:** Time-aligns real-time on-device ASR (speech-to-text) directly to board step deltas.
* **📐 Equation & Math OCR:** Renders handwritten chalkboard math into clean LaTeX structures.
* **🧠 Conversational Study Layer (Stretch Goal):** Offline, on-device RAG enabling students to ask questions like *"What did sir say about eigenvalues?"* answered directly from their own lecture data.
* **🔒 100% On-Device & Private:** Zero internet required, zero cloud API latency, and zero recurring per-student costs. Built for tier-2/3 Indian classrooms with spotty connectivity.

---

## 🏗️ Architecture Flow

```text
[ Camera Preview ] ---> [ Frame Differencing ] ---> [ Occlusion Check ]
                                                               |
                                                     (Board Delta Captured)
                                                               |
[ On-Device Speech ] -> [ Timestamp Alignment ] ----> [ Fused Note Engine ]
                                                               |
                                                     [ Local Vector Store ]
                                                               |
                                                     [ Offline RAG / Tutor ]

```

---

## 🛠️ Tech Stack & Hardware Optimization

* **Platform:** Android Native (Kotlin)
* **Vision Pipeline:** CameraX, OpenCV Frame Differencing, Custom Math OCR (pix2tex / ML Kit)
* **Audio & Speech:** On-device Whisper-class ASR model
* **On-Device AI Engine:** Quantized INT4 LLM + Vector Store running on Snapdragon NPU / GPU
* **Target Device:** Optimized for sustained dual-model compute, thermal stability, and battery efficiency on **iQOO 15**.

---

## 🎯 Hackathon Scope & Roadmap

| Component | Scope | Description |
| --- | --- | --- |
| **Board Delta Detection** | **Core MVP** | Real-time frame differencing & occlusion removal |
| **Voice-Board Fusion** | **Core MVP** | Time-aligning speech transcript chunks to captured board steps |
| **Equation OCR** | **Extended** | Converting handwritten equations to formatted LaTeX |
| **Conversational RAG Tutor** | **Stretch Vision** | Local vector store + INT4 LLM voice-in/out study assistant |

---

## 📂 Repository Structure

```text
AirNote/
├── app/
│   ├── src/main/java/com/airnote/
│   │   ├── camera/        # Frame capture & Occlusion Detection
│   │   ├── audio/         # On-device Speech-to-Text Processing
│   │   ├── fusion/        # Time-alignment & Fused Note Engine
│   │   └── ui/            # Jetpack Compose UI & Board Viewfinder
├── models/                # Quantized models & ONNX runtimes
└── docs/                  # Architecture specs & Pitch materials

```



Here is the updated, production-ready `README.md` structured specifically for the `Version-2.0` branch of your repository (`Mithil-7/AirNote`).

Copy and paste this directly into your `README.md` file on the `Version-2.0` branch:

```markdown
# AirNote AI — Version 2.0 🚀

> **iQOO Hackathon 2026 Submission**  
> *A photo saves the final board. AirNote saves the way the teacher got there.*

[![Hackathon](https://img.shields.io/badge/iQOO--Hackathon-2026-blue)](https://github.com/Mithil-7/AirNote/tree/Version-2.0)
[![Branch](https://img.shields.io/badge/Branch-Version--2.0-indigo)](#)
[![On-Device](https://img.shields.io/badge/Compute-100%25%20On--Device%20NPU-success)](#)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](#)

---

## 📌 Overview

In fast, equation-dense lectures (JEE/NEET coaching, STEM degrees), students face an impossible tradeoff: **copy the board or listen to the explanation**. Doing both leads to missing half of each. 

Existing solutions fail in isolated silos:
* **Photo Scanners:** Save only the static, final state after intermediate steps are erased.
* **Audio Recorders:** Provide contextless transcripts without visual board synchronization.

**AirNote AI** bridges this gap. Running entirely on-device via the Snapdragon NPU, AirNote monitors the lecture board, detects new lines the moment they appear (occlusion-aware), and **fuses the exact sentence spoken by the instructor to the specific equation written on the board**.

---

## ✨ Key Features (v2.0)

* **📸 Occlusion-Aware Delta Detection:** Captures board updates only after the instructor steps away from the frame.
* **🎙️ Spoken-Context Fusion:** Time-aligns real-time on-device ASR (speech-to-text) directly to board step deltas.
* **📐 Equation & Math OCR:** Renders handwritten chalkboard math into clean LaTeX structures.
* **🧠 Conversational Study Layer (Stretch Goal):** Offline, on-device RAG enabling students to ask questions like *"What did sir say about eigenvalues?"* answered directly from their own lecture data.
* **🔒 100% On-Device & Private:** Zero internet required, zero cloud API latency, and zero recurring per-student costs. Built for tier-2/3 Indian classrooms with spotty connectivity.

---

## 🏗️ Architecture Flow

```text
[ Camera Preview ] ---> [ Frame Differencing ] ---> [ Occlusion Check ]
                                                               |
                                                     (Board Delta Captured)
                                                               |
[ On-Device Speech ] -> [ Timestamp Alignment ] ----> [ Fused Note Engine ]
                                                               |
                                                     [ Local Vector Store ]
                                                               |
                                                     [ Offline RAG / Tutor ]

```

---

## 🛠️ Tech Stack & Hardware Optimization

* **Platform:** Android Native (Kotlin)
* **Vision Pipeline:** CameraX, OpenCV Frame Differencing, Custom Math OCR (pix2tex / ML Kit)
* **Audio & Speech:** On-device Whisper-class ASR model
* **On-Device AI Engine:** Quantized INT4 LLM + Vector Store running on Snapdragon NPU / GPU
* **Target Device:** Optimized for sustained dual-model compute, thermal stability, and battery efficiency on **iQOO 15**.

---

## 🎯 Hackathon Scope & Roadmap

| Component | Scope | Description |
| --- | --- | --- |
| **Board Delta Detection** | **Core MVP** | Real-time frame differencing & occlusion removal |
| **Voice-Board Fusion** | **Core MVP** | Time-aligning speech transcript chunks to captured board steps |
| **Equation OCR** | **Extended** | Converting handwritten equations to formatted LaTeX |
| **Conversational RAG Tutor** | **Stretch Vision** | Local vector store + INT4 LLM voice-in/out study assistant |

---

## 📂 Repository Structure

```text
AirNote/
├── app/
│   ├── src/main/java/com/airnote/
│   │   ├── camera/        # Frame capture & Occlusion Detection
│   │   ├── audio/         # On-device Speech-to-Text Processing
│   │   ├── fusion/        # Time-alignment & Fused Note Engine
│   │   └── ui/            # Jetpack Compose UI & Board Viewfinder
├── models/                # Quantized models & ONNX runtimes
└── docs/                  # Architecture specs & Pitch materials

```

---

## 🚀 Getting Started

### Prerequisites

* Android Studio Ladybug or newer
* Android SDK 34+
* Device with NPU support recommended (e.g., iQOO 15 / Snapdragon 8 Gen series)

### Installation

```bash
git clone [https://github.com/Mithil-7/AirNote.git](https://github.com/Mithil-7/AirNote.git)
cd AirNote
git checkout Version-2.0

```

---

## 📜 License

Distributed under the MIT License.

```

---

### Recommended Repo Quick-Settings
1. **GitHub About Section:** Set description to:  
   `On-device classroom note-taker for iQOO Hackathon 2026. Fuses board step capture with spoken instructor context offline.`
2. **Repository Topics:** `android`, `iqoo-hackathon`, `on-device-ai`, `computer-vision`, `rag`, `kotlin`.

```

---

## 🚀 Getting Started

### Prerequisites

* Android Studio Ladybug or newer
* Android SDK 34+
* Device with NPU support recommended (e.g., iQOO 15 / Snapdragon 8 Gen series)

### Installation

```bash
git clone [https://github.com/Mithil-7/AirNote.git](https://github.com/Mithil-7/AirNote.git)
cd AirNote
git checkout Version-2.0

```

---

## 📜 License

Distributed under the MIT License.

```

---

### Recommended Repo Quick-Settings
1. **GitHub About Section:** Set description to:  
   `On-device classroom note-taker for iQOO Hackathon 2026. Fuses board step capture with spoken instructor context offline.`
2. **Repository Topics:** `android`, `iqoo-hackathon`, `on-device-ai`, `computer-vision`, `rag`, `kotlin`.

```
