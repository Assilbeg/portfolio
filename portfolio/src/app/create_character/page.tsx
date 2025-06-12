"use client";

import React, { useState } from 'react';
import * as _Builtin from "../../devlink/_Builtin";
import { GlobalStyles } from "../../devlink";

interface CharacterData {
  age: string;
  ethnicity: string;
  hairLength: string;
  hairStyle: string;
  gender: string;
  hairColor: string;
}

interface Option {
  value: string;
  label: string;
  icon?: string;
  color?: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 'gender',
    title: 'Quel est votre sexe ?',
    subtitle: 'Nous aimerions en savoir plus sur vous ! Aidez-nous à créer des photos parfaites qui vous ressemblent.',
    options: [
      { value: 'male', label: "Homme", icon: '♂' },
      { value: 'female', label: 'Femme', icon: '♀' },
      { value: 'non-binary', label: 'Non Binaire', icon: '⚧' }
    ]
  },
  {
    id: 'age',
    title: 'Quel âge avez-vous ?',
    subtitle: 'Cela nous aide à créer des images qui correspondent à votre tranche d\'âge.',
    options: [
      { value: '18-25', label: '18-25 ans' },
      { value: '26-35', label: '26-35 ans' },
      { value: '36-45', label: '36-45 ans' },
      { value: '46-55', label: '46-55 ans' },
      { value: '56+', label: '56+ ans' }
    ]
  },
  {
    id: 'ethnicity',
    title: 'Quelle est votre origine ethnique ?',
    subtitle: 'Cette information nous aide à créer des images qui vous ressemblent vraiment.',
    options: [
      { value: 'caucasian', label: 'Caucasien' },
      { value: 'african', label: 'Africain' },
      { value: 'asian', label: 'Asiatique' },
      { value: 'hispanic', label: 'Hispanique' },
      { value: 'middle-eastern', label: 'Moyen-Oriental' },
      { value: 'mixed', label: 'Mixte' },
      { value: 'other', label: 'Autre' }
    ]
  },
  {
    id: 'hairColor',
    title: 'Quelle est la couleur de vos cheveux ?',
    subtitle: 'Sélectionnez la couleur qui correspond le mieux à vos cheveux naturels.',
    options: [
      { value: 'black', label: 'Noir', color: '#2C1810' },
      { value: 'brown', label: 'Châtain', color: '#8B4513' },
      { value: 'blonde', label: 'Blond', color: '#FAD5A5' },
      { value: 'red', label: 'Roux', color: '#B22222' },
      { value: 'gray', label: 'Gris', color: '#808080' },
      { value: 'white', label: 'Blanc', color: '#F5F5F5' }
    ]
  },
  {
    id: 'hairLength',
    title: 'Quelle est la longueur de vos cheveux ?',
    subtitle: 'Choisissez la longueur qui correspond à votre coiffure actuelle.',
    options: [
      { value: 'very-short', label: 'Très courts' },
      { value: 'short', label: 'Courts' },
      { value: 'medium', label: 'Mi-longs' },
      { value: 'long', label: 'Longs' },
      { value: 'very-long', label: 'Très longs' }
    ]
  },
  {
    id: 'hairStyle',
    title: 'Quel est votre type de cheveux ?',
    subtitle: 'Cette information nous aide à créer des images avec la bonne texture de cheveux.',
    options: [
      { value: 'straight', label: 'Lisses' },
      { value: 'wavy', label: 'Ondulés' },
      { value: 'curly', label: 'Bouclés' },
      { value: 'coily', label: 'Crépus' }
    ]
  }
];

export default function CreateCharacter() {
  const [currentStep, setCurrentStep] = useState(0);
  const [characterData, setCharacterData] = useState<CharacterData>({
    gender: '',
    age: '',
    ethnicity: '',
    hairColor: '',
    hairLength: '',
    hairStyle: ''
  });

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const isLastStep = currentStep === QUESTIONS.length - 1;

  const handleOptionSelect = (value: string) => {
    setCharacterData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleContinue = () => {
    if (isLastStep) {
      // Generate character and redirect
      console.log('Character data:', characterData);
      alert('Personnage créé ! ' + JSON.stringify(characterData, null, 2));
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getCurrentValue = () => {
    return characterData[currentQuestion.id as keyof CharacterData];
  };

  const renderOption = (option: Option) => {
    const isSelected = getCurrentValue() === option.value;
    
    return (
      <_Builtin.Block
        key={option.value}
        className={`character-option ${isSelected ? 'selected' : ''}`}
        onClick={() => handleOptionSelect(option.value)}
        style={{
          padding: '20px',
          border: `2px solid ${isSelected ? '#FF6B35' : '#e0e0e0'}`,
          borderRadius: '12px',
          cursor: 'pointer',
          backgroundColor: isSelected ? '#FFF5F3' : '#FFFFFF',
          transition: 'all 0.2s ease',
          marginBottom: '16px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {/* Radio button indicator */}
        <_Builtin.Block
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: `2px solid ${isSelected ? '#FF6B35' : '#ccc'}`,
            position: 'relative',
            flexShrink: 0
          }}
        >
          {isSelected && (
            <_Builtin.Block
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#FF6B35',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </_Builtin.Block>

        {/* Option content */}
        <_Builtin.Block style={{ flex: 1 }}>
          {/* Color circle for hair color options */}
          {currentQuestion.id === 'hairColor' && option.color && (
            <_Builtin.Block
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: option.color,
                border: '2px solid #ccc',
                marginRight: '12px',
                display: 'inline-block',
                verticalAlign: 'middle'
              }}
            />
          )}
          
          {/* Icon for gender options */}
          {currentQuestion.id === 'gender' && option.icon && (
            <_Builtin.Block
              style={{
                fontSize: '24px',
                marginRight: '12px',
                display: 'inline-block',
                verticalAlign: 'middle'
              }}
            >
              {option.icon}
            </_Builtin.Block>
          )}

          <_Builtin.Block
            tag="span"
            style={{
              fontSize: '16px',
              fontWeight: '400',
              color: '#333',
              verticalAlign: 'middle',
              fontFamily: 'OpenSauceOne, system-ui, sans-serif'
            }}
          >
            {option.label}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    );
  };

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
          {/* Progress bar - tout en haut */}
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
                maxWidth: '800px',
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
                {/* Logo avec vraie image Webflow */}
                <_Builtin.Block
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '16px'
                  }}
                >
                  <_Builtin.Image
                    src="https://cdn.prod.website-files.com/68405cc01167cb8d805b754b/684ad4fe4a1ff41755e7f57f_PORTFOLIO_LOGO-removebg-preview.png"
                    alt="Portfolio Logo"
                    style={{
                      height: '32px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </_Builtin.Block>

                {/* Back button - sous le logo */}
                <_Builtin.Block
                  onClick={handleBack}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: currentStep > 0 ? 'pointer' : 'default',
                    opacity: currentStep > 0 ? 1 : 0.5,
                    color: '#666',
                    fontFamily: 'OpenSauceOne, system-ui, sans-serif',
                    fontSize: '14px'
                  }}
                >
                  <span>←</span>
                  <span>Retour</span>
                </_Builtin.Block>
              </_Builtin.Block>

              {/* Progress indicator - centré */}
              <_Builtin.Block
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80px'
                }}
              >
                <_Builtin.Block
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#FF6B35',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Decalotype, system-ui, sans-serif',
                    fontSize: '18px'
                  }}
                >
                  {currentStep + 1}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.BlockContainer>
          </_Builtin.Block>
        </_Builtin.Block>

        {/* Main content */}
        <_Builtin.BlockContainer
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
            textAlign: 'center'
          }}
        >
          {/* Question title */}
          <_Builtin.Block
            tag="h1"
            style={{
              fontFamily: 'Decalotype, system-ui, sans-serif',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '16px',
              lineHeight: '1.2',
              textTransform: 'uppercase'
            }}
          >
            {currentQuestion.title.toUpperCase()}
          </_Builtin.Block>

          {/* Question subtitle */}
          <_Builtin.Block
            tag="p"
            style={{
              fontFamily: 'OpenSauceOne, system-ui, sans-serif',
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.4',
              maxWidth: '600px',
              margin: '0 auto 40px auto'
            }}
          >
            {currentQuestion.subtitle}
          </_Builtin.Block>

          {/* Options */}
          <_Builtin.Block
            style={{
              maxWidth: '500px',
              margin: '0 auto 40px auto',
              textAlign: 'left'
            }}
          >
            {currentQuestion.options.map((option) => renderOption(option))}
          </_Builtin.Block>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!getCurrentValue()}
            style={{
              backgroundColor: getCurrentValue() ? '#FF6B35' : '#ccc',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: getCurrentValue() ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s ease',
              minWidth: '200px',
              fontFamily: 'Decalotype, system-ui, sans-serif',
              textTransform: 'uppercase'
            }}
          >
            {isLastStep ? 'CRÉER MON PERSONNAGE' : 'CONTINUER'}
          </button>
        </_Builtin.BlockContainer>
      </_Builtin.Block>
    </>
  );
} 