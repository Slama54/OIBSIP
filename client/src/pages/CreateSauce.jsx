import { Alert, Button, FileInput, TextInput, ToggleSwitch } from 'flowbite-react';


import {  Label } from "flowbite-react";
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';


export default function CreateSauce() {
  const navigate = useNavigate();
  const [file, setFile]= useState(null)
  const [formData, setFormData] = useState({ available: true });
  const [imageUploadProgress,setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError]= useState(null)
  const [publishError, setPublishError]= useState(null)
  const [available, setAvailable] = useState(true);
  console.log(available);
  console.log(formData);
  
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, photo: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await fetch('/api/sauce/createsauce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError('Failed to create the base');
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=profile`);
        return;
      }
      
      
    } catch (error) {
      setPublishError('Failed to create the pizza');
      
    }

  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Sauce</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Sauce name'
            required
            id='name'
            className='flex-1'
            onChange={(e)=>setFormData({...formData, name: e.target.value})}
          />
          
        </div>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='number'
            placeholder='Sauce price '
            required
            id='price'
            className='flex-1'
            onChange={(e)=>setFormData({...formData, price: e.target.value})}
          />
           <TextInput
            type='number'
            placeholder='Sauce stock '
            required
            id='stock'
            className='flex-1'
            onChange={(e)=>setFormData({...formData, stock: e.target.value})}
          />
         
          <ToggleSwitch checked={available} label="Available" 
                                        onChange={() => {
                                            const newAvailable = !available;
                                            setAvailable(newAvailable);
                                            setFormData({ ...formData, available: newAvailable });
                                          }} color='success' className='items-center' />
        </div> 
        <div className='flex gap-4 items-center justify-between border-4 border-blue-200 border-dotted p-3'>
            


        <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <FileInput id="dropzone-file" type='file' accept='image/*' className="hidden" onChange={(e)=>setFile(e.target.files[0])} />
      </Label>
    </div>



         
    <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.photo && (
          <img
            src={formData.photo}
            alt='upload'
            className='w-70 self-center  object-cover'
          />
        )
        }
       
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Create Sauce
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}