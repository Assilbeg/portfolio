"use client";

import React, { useState, useRef } from 'react';
import * as _Builtin from "../../../devlink/_Builtin";
import * as _Form from "../../../devlink/_Builtin/Form";
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
              padding: '20px',
              position: 'relative'
            }}
          >
            <_Builtin.BlockContainer
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative'
              }}
            >
              {/* Logo et bouton retour à gauche */}
              <_Builtin.Block
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '0'
                }}
              >
                {/* Logo */}
                <_Builtin.Block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '16px'
                  }}
                >
                  <_Builtin.Block
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#FF6B35',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontFamily: 'Decalotype, system-ui, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    P
                  </_Builtin.Block>
                  <_Builtin.Block
                    style={{
                      fontFamily: 'Decalotype, system-ui, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#333',
                      textTransform: 'uppercase'
                    }}
                  >
                    PORTFOLIO
                  </_Builtin.Block>
                </_Builtin.Block>

                {/* Back button avec composant Webflow */}
                <_Builtin.Link
                  button={true}
                  onClick={handleBack}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    color: '#666',
                    fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                    fontSize: '14px',
                    textDecoration: 'none',
                    border: 'none',
                    background: 'none',
                    padding: '0'
                  }}
                >
                  <span>←</span>
                  <span>Retour</span>
                </_Builtin.Link>
              </_Builtin.Block>

              {/* Titre centré */}
              <_Builtin.Block
                style={{
                  textAlign: 'center',
                  paddingTop: '20px'
                }}
              >
                <_Builtin.Block
                  style={{
                    fontFamily: 'Decalotype, system-ui, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase'
                  }}
                >
                  Images téléchargées
                </_Builtin.Block>
              </_Builtin.Block>

              {/* Compteur en haut à droite */}
              <_Builtin.Block
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '20px',
                  fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                  fontSize: '16px',
                  color: '#666'
                }}
              >
                {uploadedFiles.length} of 10
              </_Builtin.Block>
            </_Builtin.BlockContainer>
          </_Builtin.Block>
        </_Builtin.Block>

        {/* Main content */}
        <_Builtin.Block
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px'
          }}
        >
          <_Builtin.Block
            style={{
              display: 'flex',
              gap: '40px'
            }}
          >
            {/* Left panel - Upload area */}
            <_Builtin.Block
              style={{
                flex: '0 0 320px'
              }}
            >
              <_Builtin.Block
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '20px'
                }}
              >
                {/* Icon */}
                <_Builtin.Block
                  style={{
                    fontSize: '48px',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}
                >
                  📸
                </_Builtin.Block>

                {/* Title */}
                <_Builtin.Block
                  tag="h2"
                  style={{
                    fontFamily: 'Decalotype, system-ui, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '16px',
                    textTransform: 'uppercase'
                  }}
                >
                  Télécharger des photos
                </_Builtin.Block>

                {/* Description */}
                <_Builtin.Block
                  tag="p"
                  style={{
                    fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.5',
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}
                >
                  Now the fun begins! Select at least of{' '}
                  <strong>your best photos</strong>. Uploading a mix of close-ups, selfies and mid-range shots can help the AI better capture your face and body type.
                </_Builtin.Block>

                {/* Upload area avec composants Webflow */}
                <_Form.FormFileUploadWrapper
                  style={{
                    border: `2px dashed ${isDragOver ? '#FF6B35' : '#ddd'}`,
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
                  <_Form.FormFileUploadDefault>
                    <_Builtin.Block
                      style={{
                        fontSize: '24px',
                        marginBottom: '12px'
                      }}
                    >
                      ⬆
                    </_Builtin.Block>
                    <_Form.FormFileUploadLabel
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
                      Télécharger des fichiers
                    </_Form.FormFileUploadLabel>
                    <_Form.FormFileUploadText
                      style={{
                        fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                        fontSize: '12px',
                        color: '#999',
                        display: 'block',
                        marginBottom: '4px'
                      }}
                    >
                      or drag and drop your photos
                    </_Form.FormFileUploadText>
                    <_Form.FormFileUploadInfo
                      style={{
                        fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                        fontSize: '12px',
                        color: '#999'
                      }}
                    >
                      PNG, JPG, HEIC, WEBP jusqu&apos;à 120MB
                    </_Form.FormFileUploadInfo>
                  </_Form.FormFileUploadDefault>
                </_Form.FormFileUploadWrapper>

                <_Form.FormFileUploadInput
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />

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
                          fontSize: '16px'
                        }}
                      >
                        📁
                      </_Builtin.Block>
                      <_Builtin.Block
                        style={{
                          flex: 1,
                          fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                          fontSize: '12px',
                          color: '#333'
                        }}
                      >
                        {file.file.name}
                      </_Builtin.Block>
                      <_Builtin.Block
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#FF6B35'
                        }}
                      />
                    </_Builtin.Block>
                  ))}
                </_Builtin.Block>
              )}
            </_Builtin.Block>

            {/* Right panel - Photos téléchargées et Requirements */}
            <_Builtin.Block
              style={{
                flex: '1'
              }}
            >
              {/* Photos téléchargées section */}
              {uploadedFiles.length > 0 && (
                <_Builtin.Block
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '24px'
                  }}
                >
                  <_Builtin.Block
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px'
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
                        {/* Delete button avec composant Webflow */}
                        <_Builtin.Link
                          button={true}
                          onClick={() => handleRemoveFile(file.id)}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '14px',
                            textDecoration: 'none'
                          }}
                        >
                          🗑
                        </_Builtin.Link>
                      </_Builtin.Block>
                    ))}
                  </_Builtin.Block>
                </_Builtin.Block>
              )}

              {/* Exigences en matière de photos */}
              <_Builtin.Block
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  marginBottom: '24px'
                }}
              >
                <_Builtin.Block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}
                >
                  <_Builtin.Block
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#22C55E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    ✓
                  </_Builtin.Block>
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
                    Exigences en matière de photos
                  </_Builtin.Block>
                </_Builtin.Block>

                {/* Grid of examples */}
                <_Builtin.Block
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px'
                  }}
                >
                  {/* Examples content... */}
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
                      ✨ Clear
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
                      Upload photos taken from a good distance, ideally taken from the chest or waist up.
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>

              {/* Restrictions photographiques */}
              <_Builtin.Block
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px'
                }}
              >
                <_Builtin.Block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}
                >
                  <_Builtin.Block
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    ⚠
                  </_Builtin.Block>
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
                    Restrictions photographiques
                  </_Builtin.Block>
                </_Builtin.Block>

                {/* Grid of restrictions */}
                <_Builtin.Block
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px'
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
        </_Builtin.Block>

        {/* Continue button */}
        <_Builtin.Block
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#FAFAFA'
          }}
        >
          <_Form.FormButton
            onClick={handleContinue}
            disabled={uploadedFiles.length === 0}
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
              textTransform: 'uppercase'
            }}
          >
            Continuer
          </_Form.FormButton>
        </_Builtin.Block>
      </_Builtin.Block>
    </>
  );
} 