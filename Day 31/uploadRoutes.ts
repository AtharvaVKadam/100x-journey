import { Router, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { requireAuth, AuthRequest } from './authMiddleware'; 

const router = Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const cleanName = file.originalname.replace(/\s+/g, '_');
        cb(null, `${uniqueSuffix}-${cleanName}`);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, 
});

router.post('/', requireAuth, upload.single('audioFile'), (req: AuthRequest, res: Response): void => {
    try {
        if (!req.file) {
             res.status(400).json({ error: "No file provided or invalid file type." });
             return;
        }

        console.log(`✅ File received: ${req.file.filename}`);

        res.status(200).json({
            message: "File ingested successfully",
            filename: req.file.filename,
            size: req.file.size
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Internal server error during upload." });
    }
});

export default router;