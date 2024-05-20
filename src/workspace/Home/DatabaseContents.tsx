import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DatabaseContents: React.FC = () => {
  const [images, setImages] = useState<{ _id: string; name: string; img: { data: string; contentType: string } }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/images')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', file.name);

    axios.post('http://localhost:3000/upload', formData)
      .then(response => {
        console.log(response.data);
        return axios.get('http://localhost:3000/images');
      })
      .then(response => setImages(response.data))
      .catch(error => console.error('Error uploading image:', error));
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <input type="file" onChange={handleImageUpload} />
      <div className="gallery">
        {images.map(image => (
          <div key={image._id}>
            <img src={`data:${image.img.contentType};base64,${Buffer.from(image.img.data).toString('base64')}`} alt={image.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseContents;
