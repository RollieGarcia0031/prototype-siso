import { storage } from "./config";
import { ref, uploadBytes, getDownloadURL, updateMetadata, deleteObject} from "firebase/storage";
import { songsStoragePath } from "@/util/constants"

export async function SB_uploadSong(file){
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const filePath = `${songsStoragePath}/${fileName}`;
  const fileRef = ref(storage, filePath);
  return await uploadBytes(fileRef, file);
}

// Function to upload a file
// async function uploadFile(filePath, file) {
//   const fileRef = ref(storage, filePath);
//   await uploadBytes(fileRef, file);
//   console.log("File uploaded successfully!");
// }

// // Function to get a file's download URL
// async function getFileURL(filePath) {
//   const fileRef = ref(storage, filePath);
//   const url = await getDownloadURL(fileRef);
//   return url;
// }

// // Function to update file metadata
// async function updateFileMetadata(filePath, newMetadata) {
//   const fileRef = ref(storage, filePath);
//   await updateMetadata(fileRef, newMetadata);
//   console.log("File metadata updated successfully!");
// }

// // Function to delete a file
// async function deleteFile(filePath) {
//   const fileRef = ref(storage, filePath);
//   await deleteObject(fileRef);
//   console.log("File deleted successfully!");
// }