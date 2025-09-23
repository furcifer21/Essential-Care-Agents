'use client';

import React, {useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import axios from 'axios';
import { useAuthStore } from '../../storage';
import {AVATAR_API_URL, CLIENT_API_URL, IMAGE_API_URL} from "../../constants";
import {toast} from "sonner";

export default function AvatarUploader({user, token}) {
  const { updateAvatar } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropzone, setShowDropzone] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Валидация формата файла
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Please select a JPG or PNG image.');
      return;
    }

    // Валидация размера файла (до 500KB)
    if (file.size > 500  * 1024) {
      setError('File size should not exceed 500KB.');
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    maxFiles: 1,
    disabled: isUploading,
  });

  useEffect(() => {
    if(!selectedFile) return;
    handleUpload().then();
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.post(
        CLIENT_API_URL +'/api/user/save-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer '+token, // Замените на ваш токен
          },
        }
      );

      const { avatar_path } = response.data;
      updateAvatar(avatar_path); // Обновляем Zustand store
      setShowDropzone(false);
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload avatar.');
    } finally {
      setIsUploading(false);
    }
    return !error;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="text-start">
          {!showDropzone ?
              user?.avatar_path ? (
                <div className="mb-3">
                  <img
                    src={AVATAR_API_URL + user.avatar_path + '?x='+new Date().getTime()}
                    alt="User Avatar"
                    width={150}
                    height={150}
                    className="rounded-circle object-fit-cover"
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <Image
                    src={'/images/user-normal.png'}
                    alt="User Avatar"
                    width={150}
                    height={150}
                    className="rounded-circle object-fit-cover"
                  />
                </div>
              )
            :
            ( <>
                <div
                  {...getRootProps()}
                  className={`border border-2 rounded-circle p-4 text-center mb-3 pointer avatar-dropzone ${
                    isDragActive ? 'border-primary bg-light' : 'border-secondary'
                  }`}
                  style={{width:'150px'}}
                >
                  <input {...getInputProps()} />
                  <p className="mb-0">
                    {isDragActive
                      ? 'Drop the image here'
                      : 'Drag & drop an image or click to select (JPG/PNG)'}
                  </p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
              </>
            )
          }
          <div style={{ width: '150px' }} className={'text-center'}>
            <button
              className="btn btn-link p-0 mb-3 update-avatar-btn"
              onClick={() => setShowDropzone(!showDropzone)}
            >
              {showDropzone ? 'Cancel' : 'Update avatar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}