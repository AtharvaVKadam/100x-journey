# 🎙️ MeetAI - AI Meeting Transcription SaaS

MeetAI is a full-stack, AI-powered Software-as-a-Service (SaaS) application designed to ingest audio files and generate intelligent meeting transcripts. 

## 🏗️ System Architecture

This project is built using a modern, decoupled full-stack architecture:

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Node.js, Express.js, TypeScript
* **Database:** PostgreSQL (with optimized B-Tree indexing)
* **Authentication:** Custom JWT (JSON Web Tokens) & bcryptjs
* **Storage:** Multer (Multipart/form-data ingestion)

## 🚀 Features

* **Secure Authentication:** Complete registration and login flows with hashed passwords and protected API routes.
* **Dynamic Dashboard:** Client-side routing with protected views and dynamic profile fetching.
* **Audio Ingestion Engine:** Custom drag-and-drop React component wired to an Express/Multer backend capable of handling heavy binary payloads securely.

## 💻 Local Development Setup

To run this project locally, you will need Node.js and PostgreSQL installed.

### 1. Database Setup
Ensure PostgreSQL is running and create a local database.

### 2. Backend Setup
```bash
cd backend
npm install
# Rename .env.example to .env and add your database credentials
npm run dev