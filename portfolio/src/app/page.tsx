"use client";

import React, { useState } from 'react';
import * as _Builtin from "../devlink/_Builtin";
import { GlobalStyles } from "../devlink";

interface CosmosImage {
  url: string;
  id?: string;
  title?: string;
}

interface CosmosApiResponse {
  results?: CosmosImage[];
  images?: CosmosImage[];
  data?: CosmosImage[];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState<CosmosImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/cosmos-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json() as CosmosApiResponse;

      // Adapter la réponse selon la structure de l'API Cosmos
      const imageResults = data.results || data.images || data.data || [];
      setImages(imageResults.slice(0, 12)); // Limiter à 12 images

    } catch (err) {
      setError(`Erreur lors de la recherche: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <GlobalStyles />
      <_Builtin.Block
        style={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Header */}
        <_Builtin.Block
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 0'
          }}
        >
          <_Builtin.BlockContainer
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 1rem'
            }}
          >
            <_Builtin.Block
              tag="h1"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0
              }}
            >
              Recherche d&apos;Images Cosmos.so
            </_Builtin.Block>
          </_Builtin.BlockContainer>
        </_Builtin.Block>

        {/* Main Content */}
        <_Builtin.BlockContainer
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem'
          }}
        >
          {/* Search Section */}
          <_Builtin.Block
            style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}
          >
            <_Builtin.Block
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Rechercher des images (ex: cinematic woman red aesthetic)"
                style={{
                  flex: '1',
                  minWidth: '300px',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                }}
              />
              
              <button
                onClick={handleSearch}
                disabled={isLoading || !searchTerm.trim()}
                style={{
                  backgroundColor: isLoading ? '#94a3b8' : '#3b82f6',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {isLoading ? 'Recherche...' : 'Rechercher'}
              </button>
            </_Builtin.Block>
          </_Builtin.Block>

          {/* Error Message */}
          {error && (
            <_Builtin.Block
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '2rem'
              }}
            >
              <_Builtin.Block style={{ color: '#dc2626', fontWeight: '500' }}>
                {error}
              </_Builtin.Block>
            </_Builtin.Block>
          )}

          {/* Loading State */}
          {isLoading && (
            <_Builtin.Block
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                color: '#64748b'
              }}
            >
              <_Builtin.Block style={{ fontSize: '18px' }}>
                Recherche en cours...
              </_Builtin.Block>
            </_Builtin.Block>
          )}

          {/* Images Grid */}
          {images.length > 0 && !isLoading && (
            <_Builtin.Block
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}
            >
              {images.map((image, index) => (
                <_Builtin.Block
                  key={image.id || index}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <_Builtin.Block
                    style={{
                      width: '100%',
                      height: '300px',
                      backgroundImage: `url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Overlay for better text readability */}
                    <_Builtin.Block
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        padding: '1rem'
                      }}
                    >
                      {image.title && (
                        <_Builtin.Block
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          {image.title}
                        </_Builtin.Block>
                      )}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ))}
            </_Builtin.Block>
          )}

          {/* No Results */}
          {images.length === 0 && !isLoading && searchTerm && !error && (
            <_Builtin.Block
              style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#64748b'
              }}
            >
              <_Builtin.Block style={{ fontSize: '18px', marginBottom: '0.5rem' }}>
                Aucune image trouvée
              </_Builtin.Block>
              <_Builtin.Block style={{ fontSize: '14px' }}>
                Essayez avec d&apos;autres mots-clés
              </_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.BlockContainer>
      </_Builtin.Block>
    </>
  );
}
