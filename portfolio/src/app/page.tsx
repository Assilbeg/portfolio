"use client";

import React, { useState } from "react";
import { Section, Block, Link } from "@/devlink/_Builtin";

interface CosmosImage {
  id: number;
  image: {
    url: string;
  };
  text: string | null;
  ownerName: string | null;
}

interface CosmosApiResponse {
  data: {
    search: {
      elements: {
        items: CosmosImage[];
      };
    };
  };
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState<CosmosImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchImages = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('https://api.www.cosmos.so/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiUmVmcmVzaFRva2VuIiwic3ViIjoiMTI5NTk4OCIsImp0aSI6ImUzOWVmNzQ3LTMxMmMtNDdlNS1hM2IxLTVjOTQ3Njc1OTk5NCIsIm5iZiI6MTc0ODc4MDQzMiwiZXhwIjoxNzgwMzE2NDMyLCJpYXQiOjE3NDg3ODA0MzJ9.bxYLgJcfTTl_EOCbcoJDKDO-ITAwJu9QKG1N5ozRWk0'
        },
        body: JSON.stringify({
          operationName: "SearchGlobalElementsUser",
          variables: {
            searchTerm: searchTerm
          },
          query: "query SearchGlobalElementsUser($searchTerm: String!) { search(searchTerm: $searchTerm) { elements(meta: {pageSize: 20}) { items { id image { url } text ownerName } } } }"
        })
      });

      const data = await response.json() as CosmosApiResponse;
      
      if (data.data?.search?.elements?.items) {
        setImages(data.data.search.elements.items);
      } else {
        setError("Aucune image trouvée");
      }
    } catch (err) {
      setError("Erreur lors de la recherche");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchImages();
    }
  };

  return (
    <Section
      tag="section"
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <Block tag="div" className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <Block tag="div" style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              background: "linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
            }}
          >
            Cosmos Image Search
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "32px" }}>
            Recherchez des images créatives avec l'API Cosmos.so
          </p>
        </Block>

        {/* Search Section */}
        <Block tag="div" style={{ 
          display: "flex", 
          gap: "12px", 
          marginBottom: "40px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ex: cinematic woman red aesthetic"
            style={{
              padding: "12px 16px",
              fontSize: "1rem",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "400px",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = "#3245ff"}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = "#e1e5e9"}
          />
          
          <Link
            button={true}
            onClick={searchImages}
            style={{
              padding: "12px 24px",
              backgroundColor: isLoading ? "#ccc" : "#3245ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s ease",
              textDecoration: "none",
            }}
          >
            {isLoading ? "Recherche..." : "Rechercher"}
          </Link>
        </Block>

        {/* Error Message */}
        {error && (
          <Block tag="div" style={{
            color: "#e74c3c",
            textAlign: "center",
            marginBottom: "20px",
            padding: "12px",
            backgroundColor: "#fdf2f2",
            borderRadius: "8px",
            border: "1px solid #fed7d7"
          }}>
            {error}
          </Block>
        )}

        {/* Results Count */}
        {images.length > 0 && (
          <Block tag="div" style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "1rem",
            color: "#666"
          }}>
            {images.length} images trouvées pour "{searchTerm}"
          </Block>
        )}

        {/* Images Grid */}
        {images.length > 0 && (
          <Block tag="div" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}>
            {images.map((item: CosmosImage) => (
              <Block 
                key={item.id} 
                tag="div" 
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onClick={() => window.open(item.image.url, '_blank')}
              >
                <img
                  src={item.image.url}
                  alt={item.text || `Image ${item.id}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block"
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                {item.text && (
                  <Block tag="div" style={{
                    padding: "12px",
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    color: "#333"
                  }}>
                    {item.text}
                  </Block>
                )}
              </Block>
            ))}
          </Block>
        )}

        {/* Welcome message when no search */}
        {images.length === 0 && !isLoading && !error && (
          <Block tag="div" style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#666"
          }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "12px" }}>
              Tapez un terme de recherche pour commencer
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              Exemples : "cinematic portrait", "red aesthetic", "urban photography"
            </p>
          </Block>
        )}

      </Block>
    </Section>
  );
}
