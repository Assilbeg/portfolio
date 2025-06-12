"use client";

import React, { useState, useRef } from 'react';
import * as _Builtin from "../../../devlink/_Builtin";
import { GlobalStyles } from "../../../devlink";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

export default function UploadPhotos() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/') && uploadedFiles.length + newFiles.length < 10) {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        newFiles.push({ id, file, preview });
      }
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleContinue = () => {
    console.log('Uploaded files:', uploadedFiles);
    alert(`${uploadedFiles.length} photos téléchargées !`);
  };

  const progress = 100;

  return (
    <>
      <GlobalStyles />
      <_Builtin.Block
        style={{
          minHeight: '100vh',
          backgroundColor: '#FAFAFA',
          fontFamily: 'OpenSauceOne, system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Header with progress bar at top */}
        <_Builtin.Block
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          {/* Progress bar */}
          <_Builtin.Block
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e0e0e0',
              overflow: 'hidden'
            }}
          >
            <_Builtin.Block
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#FF6B35',
                transition: 'width 0.3s ease'
              }}
            />
          </_Builtin.Block>

          {/* Header content */}
          <_Builtin.Block
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Logo */}
            <_Builtin.Block
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Aragon
            </_Builtin.Block>

            {/* Back button */}
            <_Builtin.Link
              button={true}
              onClick={handleBack}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                color: '#666',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'OpenSauceOne, system-ui, sans-serif'
              }}
            >
              ← Retour
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>

        {/* Main content */}
        <_Builtin.Block
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px'
          }}
        >
          {/* Left panel - Upload area */}
          <_Builtin.Block>
            {/* Title */}
            <_Builtin.Block
              tag="h1"
              style={{
                fontFamily: 'Decalotype, system-ui, sans-serif',
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}
            >
              Upload your photos
            </_Builtin.Block>

            <_Builtin.Block
              tag="p"
              style={{
                fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
                lineHeight: '1.5'
              }}
            >
              Upload 4-10 high-quality photos of yourself. Read the requirements on the right before uploading.
            </_Builtin.Block>

            {/* Upload status */}
            <_Builtin.Block
              style={{
                backgroundColor: '#FFF5F3',
                border: '1px solid #FFE4E1',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              <_Builtin.Block
                style={{
                  fontFamily: 'Decalotype, system-ui, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#FF6B35',
                  textTransform: 'uppercase'
                }}
              >
                {uploadedFiles.length} of 10 photos uploaded
              </_Builtin.Block>
            </_Builtin.Block>

            {/* Upload area */}
            <_Builtin.Block>
              {/* Upload zone */}
              <_Builtin.Block
                style={{
                  border: '2px dashed #ccc',
                  borderRadius: '12px',
                  padding: '32px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragOver ? '#FFF5F3' : '#FAFAFA',
                  transition: 'all 0.2s ease',
                  marginBottom: '16px'
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleUploadClick}
              >
                <_Builtin.Block
                  style={{
                    fontSize: '24px',
                    marginBottom: '12px'
                  }}
                >
                  ⬆
                </_Builtin.Block>
                <_Builtin.Block
                  style={{
                    fontFamily: 'Decalotype, system-ui, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#FF6B35',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    display: 'block'
                  }}
                >
                  Choose files to upload
                </_Builtin.Block>
                <_Builtin.Block
                  style={{
                    fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                    fontSize: '12px',
                    color: '#999',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  or drag and drop your photos
                </_Builtin.Block>
                <_Builtin.Block
                  style={{
                    fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                    fontSize: '12px',
                    color: '#999'
                  }}
                >
                  PNG, JPG, HEIC, WEBP jusqu&apos;à 120MB
                </_Builtin.Block>
              </_Builtin.Block>

              {/* File input using Webflow component */}
              <_Builtin.FormFileUploadWrapper>
                <_Builtin.FormFileUploadInput
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />
              </_Builtin.FormFileUploadWrapper>

              {/* Upload progress note */}
              <_Builtin.Block
                style={{
                  fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                  textAlign: 'center'
                }}
              >
                Le téléchargement peut prendre jusqu&apos;à 1 minute
              </_Builtin.Block>
            </_Builtin.Block>

            {/* Upload progress files (when uploading) */}
            {uploadedFiles.length > 0 && (
              <_Builtin.Block
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '16px'
                }}
              >
                {uploadedFiles.slice(0, 3).map((file) => (
                  <_Builtin.Block
                    key={file.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <_Builtin.Block
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        backgroundImage: `url(${file.preview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <_Builtin.Block
                      style={{
                        flex: 1,
                        fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                        fontSize: '14px',
                        color: '#333'
                      }}
                    >
                      {file.file.name}
                    </_Builtin.Block>
                    <_Builtin.Block
                      style={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        maxWidth: '120px'
                      }}
                    >
                      <_Builtin.Block
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#22C55E',
                          borderRadius: '2px'
                        }}
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      style={{
                        fontSize: '12px',
                        color: '#22C55E',
                        fontFamily: 'OpenSauceOne, system-ui, sans-serif'
                      }}
                    >
                      ✓
                    </_Builtin.Block>
                  </_Builtin.Block>
                ))}
                {uploadedFiles.length > 3 && (
                  <_Builtin.Block
                    style={{
                      textAlign: 'center',
                      padding: '8px 0',
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666'
                    }}
                  >
                    Et {uploadedFiles.length - 3} autres fichiers...
                  </_Builtin.Block>
                )}
              </_Builtin.Block>
            )}

            {/* Photo grid when uploaded */}
            {uploadedFiles.length > 0 && (
              <_Builtin.Block
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '20px'
                }}
              >
                <_Builtin.Block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <_Builtin.Block
                    tag="h3"
                    style={{
                      fontFamily: 'Decalotype, system-ui, sans-serif',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#333',
                      textTransform: 'uppercase'
                    }}
                  >
                    Photos téléchargées
                  </_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer'
                    }}
                  >
                    ⬆
                  </_Builtin.Block>
                </_Builtin.Block>

                {/* Progress bar */}
                <_Builtin.Block
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '3px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                  }}
                >
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#22C55E',
                      borderRadius: '3px'
                    }}
                  />
                </_Builtin.Block>

                {/* Grid of uploaded photos */}
                <_Builtin.Block
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '12px'
                  }}
                >
                  {uploadedFiles.map((file) => (
                    <_Builtin.Block
                      key={file.id}
                      style={{
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#F3F4F6'
                      }}
                    >
                      <_Builtin.Image
                        src={file.preview}
                        alt="Uploaded"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <_Builtin.Block
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: 'white'
                        }}
                        onClick={() => handleRemoveFile(file.id)}
                      >
                        ×
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ))}
                </_Builtin.Block>
              </_Builtin.Block>
            )}
          </_Builtin.Block>

          {/* Right panel - Requirements */}
          <_Builtin.Block>
            {/* Requirements section */}
            <_Builtin.Block
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '24px'
              }}
            >
              <_Builtin.Block
                tag="h2"
                style={{
                  fontFamily: 'Decalotype, system-ui, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '24px',
                  textTransform: 'uppercase'
                }}
              >
                🟢 Photo requirements
              </_Builtin.Block>

              <_Builtin.Block
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px'
                }}
              >
                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    📱 Selfies
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Upload frontal selfies that are well-lit and taken at eye-level
                  </_Builtin.Block>
                </_Builtin.Block>

                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    🎭 Variety
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Upload photos in different outfits and backgrounds.
                  </_Builtin.Block>
                </_Builtin.Block>

                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    🕒 Recency
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Upload recent photos from the last 6 months that feature similar hairstyles and lengths.
                  </_Builtin.Block>
                </_Builtin.Block>

                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    💎 Clarity
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Upload high-resolution photos that are sharp and well-focused.
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>

            {/* Restrictions section */}
            <_Builtin.Block
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px'
              }}
            >
              <_Builtin.Block
                tag="h2"
                style={{
                  fontFamily: 'Decalotype, system-ui, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '24px',
                  textTransform: 'uppercase'
                }}
              >
                🔴 Photo restrictions
              </_Builtin.Block>

              <_Builtin.Block
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px'
                }}
              >
                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    ⚠ No Low-Quality Photos
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Don&apos;t upload photos that are blurry, cropped, or too dark / bright
                  </_Builtin.Block>
                </_Builtin.Block>

                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    👙 No Revealing Clothes
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Don&apos;t upload photos with low necklines, or in skimpy outfits
                  </_Builtin.Block>
                </_Builtin.Block>

                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    🕶 No Accessories
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Avoid photos of you with hats, sunglasses, headphones, lanyards, etc.
                  </_Builtin.Block>
                </_Builtin.Block>

                <_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                  <_Builtin.Block
                    tag="h4"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '4px'
                    }}
                  >
                    📐 No Unnatural Angles
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="p"
                    style={{
                      fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.3'
                    }}
                  >
                    Avoid photos taken from the side, or where you&apos;re looking away
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>

        {/* Continue button */}
        <_Builtin.Block
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#FAFAFA'
          }}
        >
          <_Builtin.Link
            button={true}
            onClick={uploadedFiles.length > 0 ? handleContinue : undefined}
            style={{
              backgroundColor: uploadedFiles.length > 0 ? '#FF6B35' : '#ccc',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s ease',
              minWidth: '200px',
              fontFamily: 'Decalotype, system-ui, sans-serif',
              textTransform: 'uppercase',
              pointerEvents: uploadedFiles.length > 0 ? 'auto' : 'none'
            }}
          >
            Continuer
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </>
  );
} 