// // ModalPage.js
// import { useEffect, useState } from 'react';
// import Modal from './components/Modal';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

// export default function ModalPage() {
//   const { id } = useParams();
  
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Fetch the image data based on the id from the API or any other source
//   useEffect(() => {
//     async function getImageData() {
//       try {
//         const res = await fetch(`https://podcast-api.netlify.app/shows/${id}`);
//         const data = await res.json();
//         setSelectedImage(data);
//         console.log(data)
//       } catch (error) {
//         console.error('Error fetching image data:', error);
//       }
//     }
//     getImageData();
//   }, [id]);

//   // Handle closing the modal and navigating back to the Discover page
//   function handleCloseModal() {
//     // Use navigate('/path-to-discover') to navigate to the Discover page
//     navigate('/path-to-/');
//   }

//   if (!selectedImage) {
//     // You can add some loading indicator here while waiting for the image data to be fetched.
//     return <div>Loading...</div>;
//   }

//   return (
    
//     <Modal
//       title={selectedImage.title}
//       image={selectedImage.image}
//       alt={selectedImage.id}
//       text={selectedImage.description}
//       limit={200}
//       onClose={handleCloseModal}
//       seasons={selectedImage.seasons}
//       updated={new Date(selectedImage.updated).toLocaleDateString('en-US', 'short')}
//     />

//   );
// }
