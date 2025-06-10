"use client";

import { useState } from "react";
import { Section, Block, Link } from "@/devlink/_Builtin";

interface CosmosImage {
  id: string;
  url: string;
  alt?: string;
  title?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<CosmosImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchImages = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`https://api.cosmos.so/search/images?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': 'Bearer pk-AFaHgOwdGZEKqVKZHcgLhUEhJwMxeKdLlIHbqaGWdQlvovJdFD',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Adapter la réponse selon la structure de l'API Cosmos
      const imageResults = data.results || data.images || data.data || [];
      setImages(imageResults.slice(0, 12)); // Limiter à 12 images
      
    } catch (err) {
      setError(`Erreur lors de la recherche: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      searchImages();
    }
  };

  const handleMouseEnter = (e: any) => {
    const target = e.currentTarget;
    target.style.transform = "translateY(-4px)";
    target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
  };

  const handleMouseLeave = (e: any) => {
    const target = e.currentTarget;
    target.style.transform = "translateY(0)";
    target.style.boxShadow = "none";
  };

  return (
    <Section
      tag="section"
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundColor: "#ffffff"
      }}
    >
      <Block tag="div" className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <Block tag="div" style={{ textAlign: "center", marginBottom: "40px" }}>
          <Block
            tag="h1"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              background: "linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
            }}
          >
            Recherche d'Images Cosmos
          </Block>
          <Block tag="p" style={{ fontSize: "1.1rem", color: "#666", marginBottom: "32px" }}>
            Interface de recherche utilisant l'API Cosmos.so
          </Block>
        </Block>

        {/* Search Bar */}
        <Block tag="div" style={{
          maxWidth: "600px",
          margin: "0 auto 40px auto",
          display: "flex",
          gap: "12px",
          alignItems: "center"
        }}>
          <Block tag="input" 
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "8px",
              border: "2px solid #e1e5e9",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            placeholder="Rechercher des images..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Link
            button={true}
            onClick={searchImages}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3245ff",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "1rem",
              cursor: "pointer",
              border: "none",
              transition: "background-color 0.2s ease",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Recherche..." : "Rechercher"}
          </Link>
        </Block>

        {/* Error Message */}
        {error && (
          <Block tag="div" style={{
            maxWidth: "600px",
            margin: "0 auto 20px auto",
            padding: "16px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "8px",
            color: "#c33",
            textAlign: "center"
          }}>
            {error}
          </Block>
        )}

        {/* Loading Indicator */}
        {loading && (
          <Block tag="div" style={{
            textAlign: "center",
            padding: "40px",
            color: "#666"
          }}>
            <Block tag="div" style={{
              display: "inline-block",
              width: "32px",
              height: "32px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #3245ff",
              borderRadius: "50%"
            }} />
            <Block tag="p" style={{ marginTop: "16px" }}>
              Recherche en cours...
            </Block>
          </Block>
        )}

        {/* Images Grid */}
        {images.length > 0 && (
          <Block tag="div" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "40px"
          }}>
            {images.map((image: CosmosImage, index: number) => (
              <Block key={image.id || index} tag="div" style={{
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e1e5e9",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
                <Block tag="img"
                  src={image.url}
                  alt={image.alt || image.title || `Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
                {(image.title || image.alt) && (
                  <Block tag="div" style={{
                    padding: "12px 16px",
                    backgroundColor: "white"
                  }}>
                    <Block tag="p" style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "#666",
                      lineHeight: "1.4"
                    }}>
                      {image.title || image.alt}
                    </Block>
                  </Block>
                )}
              </Block>
            ))}
          </Block>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && searchQuery && (
          <Block tag="div" style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#666"
          }}>
            <Block tag="h3" style={{ marginBottom: "16px", color: "#333" }}>
              Aucune image trouvée
            </Block>
            <Block tag="p">
              Essayez avec des mots-clés différents
            </Block>
          </Block>
        )}

      </Block>
    </Section>
  );
}
