import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ProfessionalContext } from '../../context/professionalContext';
import toast from 'react-hot-toast';

const UploadFile = () => {
    const { professional, fetchFiles } = useContext(ProfessionalContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !title || !description) {
            toast.error('Please fill all fields and select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('professionalId', professional.professionalId); 
        formData.append('emailAddress', professional.email);// Add professionalId to formData

        try {
            const res = await axios.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setFilePath(res.data.file.path);
            toast.success('File uploaded successfully');
            setFile('');
            setTitle('');
            setDescription('');
            setFile(null);

        } catch (err) {
            console.error(err);
            toast.error('File upload failed');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>File Upload</h1>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
        </div>
    );
};

export default UploadFile;