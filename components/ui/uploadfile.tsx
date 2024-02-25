// import { useState } from 'react';
// import axios from 'axios';

// // Replace with your PlanetScale database URL and access token
// const API_URL = 'https://your-planetscale-url/your-database';
// const ACCESS_TOKEN = 'your-access-token';
// const UploadFile = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       setError('Please select a file to upload');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('data', selectedFile);

//       // Replace with your endpoint for uploading files
//       const response = await axios.post(`${API_URL}/files`, formData, {
//         headers: {
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//       });

//       console.log('File uploaded successfully:', response.data);
//       // Handle successful upload (e.g., clear file selection, display success message)
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setError('Failed to upload file');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button disabled={isLoading} onClick={handleSubmit}>
//         {isLoading ? 'Uploading...' : 'Upload File'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default UploadFile;