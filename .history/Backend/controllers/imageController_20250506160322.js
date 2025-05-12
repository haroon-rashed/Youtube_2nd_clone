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

  
    req.io.emit('videoAdded', newVideo);

    res.status(200).json({ message: 'Video added successfully' });
  } catch (err) {
    console.error('Error inserting video:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll(); 
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).send('Database error');
  }
};

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).send('Video not found');
    }

    if (req.user.email !== 'ali@mail.com') {
      return res.status(403).json({ message: "Only ali@mail.com can update videos" });
    }

    const [updated] = await Video.update(updateData, { where: { id } });

    if (updated) {
      req.io.emit('video-updated', { id, ...updateData });
      res.send('Video updated successfully');
    } else {
      res.status(400).send('Failed to update video');
    }
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).send('Database error');
  }
};


export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).send('Video not found');
    }

    // ✅ Only ali@mail.com can delete
    if (req.user.email !== 'ali@mail.com') {
      return res.status(403).json({ message: "Only ali@mail.com can delete videos" });
    }

    await video.destroy();

    req.io.emit('videoDeleted', { id });
    res.send('Video deleted successfully');
  } catch (err) {
    console.error('Error deleting video:', err);
    res.status(500).send('Database error');
  }
};
