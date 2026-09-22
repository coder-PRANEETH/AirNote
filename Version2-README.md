# AirNote AI (v2.0)
> **The lecture that writes itself, on-device.**

[![Hackathon](https://img.shields.io/badge/iQOO_Hackathon-2026-blue.svg)](https://iqoo.com)
[![Processing](https://img.shields.io/badge/Compute-100%25_On--Device-green.svg)]()
[![Privacy](https://img.shields.io/badge/Data_Privacy-Zero_Cloud_Uploads-brightgreen.svg)]()
[![Hardware](https://img.shields.io/badge/Target_NPU-Qualcomm_Snapdragon_NPU-orange.svg)]()

---

## 📌 Executive Summary

In fast-paced, equation-dense STEM and coaching lectures (e.g., JEE/NEET preparation, engineering mathematics), students face an impossible choice: **listen to the teacher's explanation, or transcribe the board.** Do both simultaneously, and you lose half of each.

Standard alternatives fail:
- **Photos / Scanners:** Capture only the final, static state of a board—losing erased intermediate steps, derivations, and spoken context.
- **Voice Recorders / Otter:** Capture spoken audio without visual grounding for equations, diagrams, or line-by-line board progression.

**AirNote AI** bridges this gap by fusing what is written on the board with what is spoken in the classroom into a single, time-aligned, interactive study record. Operating 100% on-device on the iQOO platform, AirNote captures the derivation process—not just the final destination—with zero latency, zero cloud cost, and complete offline privacy.

> *"A photo saves the final board. AirNote saves the way the teacher got there."*

---

## ⚡ Core Value Proposition & Architectural Insight

```
       [ LECTURE BOARD ]                       [ TEACHER AUDIO ]
  Occlusion-Aware Delta Detection           On-Device Whisper/ASR Stream
             │                                       │
             └───────────────────┬───────────────────┘
                                 ▼
                     [ FUSION ENGINE (NPU) ]
         Staples spoken text to exact board line + timestamp
                                 │
                                 ▼
               [ TIME-ALIGNED FUSED NOTE RECORD ]
```

1. **Occlusion-Aware Capture:** AirNote monitors the board through the camera, waiting until the teacher steps away before taking a delta frame snapshot.
2. **Temporal Audio-Visual Fusion:** The precise sentence spoken by the teacher while writing a specific equation or line is stapled to that exact line in the note record.
3. **Conversational Study Layer (Offline RAG):** Rather than passive text-to-speech (TTS), AirNote provides an interactive, voice-in/voice-out local tutor. Students talk to their own lectures (*"Explain eigenvalues the way sir did"*), with answers generated locally from the fused board-audio vector index.

---

## 🚀 Key Features

### 1. Core Engine (30-Hour Hackathon Scope)
* **Board Delta Detection:** Frame-differencing algorithms detect each new line or equation written on the board.
* **Teacher Occlusion Detection:** Prevents capturing obstructed frames by checking teacher position before committing a delta frame.
* **Live Speech-to-Text Alignment:** On-device ASR continuously transcribes audio and timestamps spoken phrases to board update events.
* **Fused Output Generator:** Produces a structured document where visual board steps and matching spoken transcript snippets exist together.

### 2. Conversational Tutor & Extended Study Layer (Roadmap & Stretch Goals)
* **Equation OCR (LaTeX Rendering):** Converts handwritten math (e.g., $\int_0^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$) into clean, editable LaTeX formatted text using on-device vision models (`pix2tex` style).
* **On-Device RAG ("Ask Your Lecture"):** Embeds the fused note record into a local vector store. A local INT4 LLM answers questions grounded strictly in the recorded lecture.
* **Voice-In / Voice-Out Pipeline:** Speech input triggers local LLM retrieval, and TTS acts as the final output mile for a hands-free conversational tutor experience.
* **Post-Class Digest:** Automatic generation of lecture summaries, key takeaways, flashcards, and potential exam questions.

---

## 🛠️ Technical Architecture & Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           AIRNOTE AI PIPELINE                           │
└─────────────────────────────────────────────────────────────────────────┘
   
 [ Camera Stream ] ──► [ Delta Detection ] ──► [ Occlusion Filter ] ──┐
                                                                      │
 [ Mic Stream ]    ──► [ On-Device ASR ]   ──► [ Timestamp Queue ] ──┼─► [ Fusion Engine ]
                                                                      │          │
 [ Touch / Input ] ──► [ Local Vector DB ] ◄── [ INT4 On-Device LLM ] ┘          ▼
                                                       │                 [ Fused Markdown/
                                                       ▼                   Interactive Note ]
                                                [ TTS Synthesis ]
```

### Component Stack

| Layer | Component / Tech | Function |
| :--- | :--- | :--- |
| **Vision Capture** | CameraX + OpenCV / Native Frame-Diff | Detects new board lines & teacher occlusion |
| **Speech Recognition** | On-device Whisper / Native Neural ASR | Zero-latency real-time voice transcription |
| **Fusion Engine** | Custom Time-Aligner Pipeline | Pairs board delta timestamps $t_v$ with speech timestamps $t_a$ |
| **Math Engine** | ML Kit / Quantized Equation Model | Parses handwritten notation into LaTeX |
| **Conversational RAG** | Local Vector Store + Gemma/Llama INT4 LLM | Answers student queries offline against class context |
| **Voice Output** | Local TTS Engine | Reads answers out loud for conversational tutor loop |

---

## 🎯 Scope Management: The "Broken Complex" Safeguard

To ensure a working, polished deliverable within a 30-hour hackathon timeframe, AirNote AI strictly separates **Core Demo Commitments** from **Stretch / Roadmap Items**.

```
    ┌──────────────────────────────────────────────────────────────┐
    │                      30-HOUR HACKATHON CORE                  │
    │  • Board Delta Detection (Frame-diffing)                     │
    │  • On-Device Audio Transcription                             │
    │  • Time-Aligned Audio-Visual Fusion Engine                   │
    │  • Clean UI Document Viewer with Fused Output                │
    └──────────────────────────────┬───────────────────────────────┘
                                   │
                                   ▼
    ┌──────────────────────────────────────────────────────────────┐
    │                    STRETCH / ROADMAP VISION                  │
    │  • Handwritten Math to LaTeX (OCR)                           │
    │  • On-Device RAG + Local LLM ("Ask Your Notes")              │
    │  • Conversational Voice-In / Voice-Out Loop (TTS)            │
    │  • Automated Flashcard & Quiz Generation                     │
    └──────────────────────────────────────────────────────────────┘
```

---

## 📱 Why On-Device? (iQOO Hardware Integration)

AirNote AI is engineered specifically to maximize Snapdragon NPU and iQOO hardware capabilities:

1. **Zero Latency Fusion:** Live temporal matching requires instant execution without network roundtrips.
2. **Zero API Cost:** Coaching centers and students cannot afford per-minute cloud vision/audio API charges.
3. **Offline Reliability:** Tier-2/3 Indian classrooms and coaching hubs (Kota, Patna, Hyderabad) frequently lack reliable high-speed Wi-Fi.
4. **Sustained Compute Test:** Running continuous frame differencing alongside parallel audio transcription serves as an authentic stress-test for iQOO's NPU compute efficiency, thermal dissipation, and battery endurance during 90-minute lectures.

---

## 📊 Feature Comparison

| Capability | Photo / Scanner | Audio Recorder | Cloud Transcriber | AirNote AI |
| :--- | :---: | :---: | :---: | :---: |
| **Captures Board Writing** | Static Final State | ❌ | ❌ | **Step-by-Step Deltas** |
| **Captures Spoken Explanation** | ❌ | ✅ | ✅ | **Time-Aligned to Board** |
| **Preserves Derivation Steps** | ❌ | ❌ | ❌ | **Yes** |
| **Works Offline (No Internet)** | ✅ | ✅ | ❌ | **100% On-Device** |
| **Zero Data / API Cost** | ✅ | ✅ | ❌ | **Yes** |
| **Interactive Offline Tutor** | ❌ | ❌ | ❌ | **Yes (Local RAG)** |

---

## ♿ Accessibility Impact

The fused output generated by AirNote AI serves as an essential assistive tool:
* **Deaf / Hard-of-Hearing Students:** Provides the teacher's spoken context formatted directly alongside visual board updates.
* **Low-Vision Students:** Converts handwritten board content into structured text that can be spoken via TTS.

---

## 📜 License & Acknowledgments

Built for the **iQOO Hackathon 2026**. Designed to empower students in fast-paced educational environments.
