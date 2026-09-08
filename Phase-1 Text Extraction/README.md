# AirNote AI - Phase 1 Implementation Guide

An automated computer vision and OCR pipeline for lecture blackboard tracking, visual change detection, delta extraction, and text logging.

---

## Technical Architecture & Workflow
```mermaid
flowchart TD
    A["Capture Frame 1<br><i>(Base Snapshot: frame_01.png)</i>"] --> B["Capture Frame 2<br><i>(Updated Snapshot: frame_02.png)</i>"]
    B --> C["Visual Change Detection<br><i>(Gaussian Blur + AbsDiff)</i>"]
    C --> D{"Change Ratio"}
    
    D -- "Change < 2.0%" --> E["Skip Processing"]
    D -- "Change ≥ 2.0%" --> F["EasyOCR Text Extraction<br><i>(Reads lines & bounding boxes)</i>"]
    
    F --> G["difflib Delta Engine<br><i>(Isolates newly added lines '+')</i>"]
    G --> H["Output File Logger<br><i>(Appends to lecture_notes.txt)</i>"]
```
---

## Environment Setup & Requirements

### System Requirements
* **Python Version**: Python `3.9` to `3.11`
* **Operating System**: Windows / Linux / macOS
* **Dependencies**: OpenCV, EasyOCR, Matplotlib, Pillow, NumPy

### Installation Commands

```bash
# Create virtual environment
python -m venv airnote_env

# Activate environment (Windows)
airnote_env\Scripts\activate

# Activate environment (macOS/Linux)
source airnote_env/bin/activate

# Install core libraries
pip install easyocr opencv-python matplotlib pillow numpy notebook
