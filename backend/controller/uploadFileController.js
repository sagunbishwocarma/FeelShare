const File = require('../models/files');

const uploadFile = async (req, res) => {
    try {
        const { title, description, professionalId, emailAddress } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = new File({
            title,
            description,
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            size: req.file.size,
            professionalId, 
            email: emailAddress,
        });

        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadDate: -1 });
        res.status(200).json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getFilesByProfessionalId = async (req, res) => {
    try {
        const { professionalId } = req.params;
        const files = await File.find({ professionalId }).sort({ uploadDate: -1 });
        res.status(200).json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadFile, getFiles, getFilesByProfessionalId };
