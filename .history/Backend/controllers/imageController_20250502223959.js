import path from 'path';
import multer from 'multer';
import Video from '../models/imagesModel.js'; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|mkv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

// CREATE video
export const uploadVideoData = async (req, res) => {
  const { title, views, timestamp, channel, channelImage, image } = req.body;

  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!views) missingFields.push('views');
  if (!timestamp) missingFields.push('timestamp');
  if (!channel) missingFields.push('channel');

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      missingFields: missingFields,
    });
  }

  try {
    const newVideo = await Video.create({
      title,
      views,
      timestamp,
      channelImage,
      channel,
      image,
    });

    // 🔥 Emit socket event for new video
    req.io.emit('videoAdded', newVideo);

    res.status(200).json({ message: 'Video added successfully' });
  } catch (err) {
    console.error('Error inserting video:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// READ all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll(); 
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).send('Database error');
  }
};

// UPDATE video
export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const [updated] = await Video.update(updateData, { where: { id } });
    if (updated) {
      // 🔥 Emit socket event for update
      req.io.emit('videoUpdated', { id, ...updateData });

      res.send('Video updated successfully');
    } else {
      res.status(404).send('Video not found');
    }
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).send('Database error');
  }
};

// DELETE video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Video.destroy({ where: { id } });
    if (deleted) {
      // 🔥 Emit socket event for delete
      req.io.emit('videoDeleted', { id });

      res.send('Video deleted successfully');
    } else {
      res.status(404).send('Video not found');
    }
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).send('Database error');
  }
};
