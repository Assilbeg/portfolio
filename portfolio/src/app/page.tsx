"use client";

import { Section, Block, Link } from "@/devlink/_Builtin";

export default function Home() {
  return (
    <Section
      tag="section"
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundColor: "#ffffff"
      }}
    >
      <Block tag="div" className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        
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
            Portfolio Interface
          </Block>
          <Block tag="p" style={{ fontSize: "1.1rem", color: "#666", marginBottom: "32px" }}>
            Interface Webflow Cloud - Version stable ✅
          </Block>
        </Block>

        <Block tag="div" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "40px"
        }}>
          
          <Block tag="div" style={{
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e1e5e9"
          }}>
            <Block tag="h3" style={{ marginBottom: "16px", color: "#333" }}>✅ Webflow Cloud</Block>
            <Block tag="p" style={{ color: "#666", marginBottom: "16px" }}>
              Déploiement réussi avec Next.js et composants Webflow DevLink.
            </Block>
            <Link
              button={true}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3245ff",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "inline-block"
              }}
            >
              Fonctionnel
            </Link>
          </Block>

          <Block tag="div" style={{
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e1e5e9"
          }}>
            <Block tag="h3" style={{ marginBottom: "16px", color: "#333" }}>🎯 Prochaines étapes</Block>
            <Block tag="p" style={{ color: "#666", marginBottom: "16px" }}>
              Maintenant que la base fonctionne, nous pouvons ajouter les fonctionnalités.
            </Block>
            <Link
              button={true}
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "inline-block"
              }}
            >
              Prêt
            </Link>
          </Block>

        </Block>

        <Block tag="div" style={{
          textAlign: "center",
          padding: "32px",
          backgroundColor: "#e8f5e8",
          borderRadius: "12px",
          border: "1px solid #c3e6c3"
        }}>
          <Block tag="h2" style={{ marginBottom: "16px", color: "#155724" }}>🎉 Setup Clean !</Block>
          <Block tag="p" style={{ color: "#155724", marginBottom: "0" }}>
            Cette version simple compile sans erreur et utilise uniquement les composants Webflow.
          </Block>
        </Block>

      </Block>
    </Section>
  );
}
