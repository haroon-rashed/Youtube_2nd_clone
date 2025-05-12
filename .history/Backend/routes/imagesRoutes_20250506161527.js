import express from 'express';
import { upload, uploadVideoData, getAllVideos, updateVideo, deleteVideo } from '../controllers/imageController.js';
import { protect } from '../middleware/authMiddleware.js';

const imageRouter = express.Router();

imageRouter.post('/upload', upload.fields([{ name: 'channelImage' }, { name: 'image' }]), uploadVideoData);

imageRouter.get('/', getAllVideos);

imageRouter.put('/:id', protect, updateVideo);

imageRouter.delete('/:id', protect, deleteVideo);

export default imageRouter;
