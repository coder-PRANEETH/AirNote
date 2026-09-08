# AirNote AI 🎓📱

> **Autonomous Multimodal Classroom Assistant & Blackboard Delta Tracker**  
> Built for the **iQOO Hackathon** (Smart Education Track).

AirNote AI transforms live classroom dynamics by automatically tracking blackboard changes, extracting text deltas via local computer vision and OCR, and logging structured, timestamped lecture notes without cloud dependencies.

---

## 📌 Project Overview

During fast-paced lectures, students struggle to balance active listening with copying complex equations and board notes. **AirNote AI** delegates note-taking to an on-device computer vision pipeline. Using local image processing and optical character recognition (OCR), the system identifies visual changes on a lecture board, isolates newly added content, and appends structured notes directly into a local notebook file (`lecture_notes.txt`).

---

## ✨ Key Features

* **Visual Change Detection**: Employs Gaussian blurring and absolute frame differencing (`cv2.absdiff`) to monitor board updates.
* **Compute-Optimized OCR**: Triggers EasyOCR extraction *only* when board changes exceed a threshold ($\ge 2.0\%$), conserving hardware resources.
* **Smart Text Delta Engine**: Uses Python's native `difflib.Differ` sequence matcher to separate newly written text (`+`) from persistent baseline notes.
* **Automated File Logging**: Appends timestamped entries, delta additions, and complete board snapshots to `lecture_notes.txt`.
* **Zero-Cloud / Privacy-First**: Runs entirely on local hardware without sending video streams or text data to cloud APIs.

---

## 🛠️ Technical Architecture & Workflow

```text
[Capture Frame 1] ────► Base Snapshot (frame_01.png)
       │
       ▼
[Capture Frame 2] ────► Updated Snapshot (frame_02.png)
       │
       ▼
[Visual Change Detection] (Gaussian Blur + AbsDiff)
       │
       ├────────────────────────┐
       ▼                        ▼
[Change < 2.0%]          [Change ≥ 2.0%]
       │                        │
       ▼                        ▼
    (Skip)             [EasyOCR Text Extraction]
                                │
                                ▼
                       [difflib Delta Engine]
                                │
                                ▼
                       [Output File Logger] ──► 'lecture_notes.txt'
