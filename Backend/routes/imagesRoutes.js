import express from 'express';
import { upload, uploadVideoData, getAllVideos, updateVideo, deleteVideo } from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/upload', upload.fields([{ name: 'channelImage' }, { name: 'image' }]), uploadVideoData);

imageRouter.get('/', getAllVideos);

imageRouter.put('/:id', updateVideo);

imageRouter.delete('/:id', deleteVideo);

export default imageRouter;
