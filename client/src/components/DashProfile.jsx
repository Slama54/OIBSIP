import { Alert, Button, Dropdown, Modal, TextInput } from 'flowbite-react';
import{HiOutlineExclamationCircle} from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure, 
  deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData]= useState({})
  const [imageFileUploading, setImageFileUploading]= useState(false)
  const [updateUserSuccess, setUpdateUserSuccess]=useState(null)
  const [updateUserError, setUpdateUserError]=useState(null)
  const [showModal, setShowModal]= useState(false)
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const handleChange= async (e) => {
   setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit= async (e) => {
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    e.preventDefault()
    if (Object.keys(formData).length===0) {
      setUpdateUserError("No changes made")
      return
      
    }
    if (imageFileUploading ) {
      setUpdateUserError("Image is being uploaded, please wait")
      return
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(!res.ok){
        setUpdateUserError(data.message)
        dispatch(updateFailure(data.message))

        
      }
      else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile update successfully")
        
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
      
    }

  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true)
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture:downloadURL})
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleDeleteUser = async()=>{
    setShowModal(false)
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
       
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
        setShowModal(false)
        
      }
      else{
        dispatch(deleteUserSuccess(data))
        
        
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
     
      
    }
  }
  const handleSignout = async()=>{
    try {
      const res = await fetch('api/user/signout',{
        method: 'Post'
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }
      else{
        dispatch(signoutSuccess())
      }

    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username} onChange={handleChange}
        />
        
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email} onChange={handleChange}
        />
        <TextInput
          type='text'
          id='address'
          placeholder='address'
          defaultValue={currentUser.address} onChange={handleChange}/>
          <TextInput type='number' id='phone' placeholder='phone' defaultValue={currentUser.phone} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}>
          {loading ? 'loading...' :'Update'}
        </Button>
        {currentUser.isAdmin &&(
          <div className='flex items-center justify-center'>

          <div className="">
              <Link to={'/create-pizza'}>
                  <Button type='button' className='w-full' gradientDuoTone='purpleToPink'>Add a pizza</Button>
              </Link>
          </div>
            <div className="mx-4  ">
              <Dropdown label="Ingredient"  gradientDuoTone='purpleToPink' dismissOnClick={false}>
                  <Link to={'/create-base'}>
                  <Dropdown.Item>Pizza Base</Dropdown.Item>
                  </Link>
                  <Link to={'/create-sauce'}>
                  <Dropdown.Item>Pizza Sauce</Dropdown.Item>
                  </Link>
                  <Link to={'/create-cheese'}>
                  <Dropdown.Item>Cheese</Dropdown.Item>
                  </Link>
                  <Link to={'/create-meat'}>
                  <Dropdown.Item>Meat</Dropdown.Item>
                  </Link>
                  <Link to={'/create-vegetable'}>
                  <Dropdown.Item>Vegetable</Dropdown.Item>
                  </Link>
              </Dropdown>
            </div>

          </div>
          )}
        
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>}
      {updateUserError && <Alert color='failure' className='mt-5'>{updateUserError}</Alert>}
      {error && <Alert color='failure' className='mt-5'>{error}</Alert>}
      <Modal show={showModal} onClick={()=>setShowModal(false)} popup size={'md'}>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle 
            className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='text-lg text-gray-500 dark:text-gray-400 mb-5'>
              Are you sure you want to delete your account ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color={'failure'} onClick={handleDeleteUser}>Yes, I'm sure</Button>
                <Button color={'gray'} onClick={()=>setShowModal(false)}>No, Cancel</Button>
              </div>
          </div>
        </Modal.Body>

      </Modal>
              
    </div>
  );
}