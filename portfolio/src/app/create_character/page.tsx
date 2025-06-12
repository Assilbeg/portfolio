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

const QUESTIONS = [
  {
    id: 'gender',
    title: 'Quel est votre sexe ?',
    subtitle: 'Nous aimerions en savoir plus sur vous ! Aidez-nous à créer des photos parfaites qui vous ressemblent.',
    options: [
      { value: 'male', label: "L'homme", icon: '♂' },
      { value: 'female', label: 'Femme', icon: '♀' },
      { value: 'non-binary', label: 'Non Binaire', icon: '⚧' }
    ]
  },
  {
    id: 'age',
    title: 'Quel âge avez-vous ?',
    subtitle: 'Nous aimerions en savoir plus sur vous ! Aidez-nous à créer des photos parfaites qui vous ressemblent.',
    options: [
      { value: '18-20', label: '18-20' },
      { value: '21-24', label: '21-24' },
      { value: '25-29', label: '25-29' },
      { value: '30-40', label: '30-40' },
      { value: '41-50', label: '41-50' },
      { value: '51-65', label: '51-65' },
      { value: '65+', label: '65+' }
    ]
  },
  {
    id: 'ethnicity',
    title: 'Quelle est votre origine ethnique ?',
    subtitle: 'Nous aimerions en savoir plus sur vous ! Aidez-nous à créer des photos parfaites qui vous ressemblent.',
    options: [
      { value: 'caucasian', label: 'Blanc / Caucasien' },
      { value: 'black', label: "Noirs / d'origine africaine" },
      { value: 'asian-central', label: 'Asie orientale ou centrale' },
      { value: 'hispanic', label: "Hispanique, latino, d'origine espagnole" },
      { value: 'middle-eastern', label: 'Moyen-Orient, Afrique du Nord ou pays arabes' },
      { value: 'multiracial', label: 'Multiracial' },
      { value: 'pacific', label: 'Natifs hawaïens ou autres insulaires du Pacifique' },
      { value: 'south-asian', label: 'Asiatiques du Sud (Indiens, Pakistanais, Bangladais, etc.)' },
      { value: 'other', label: 'Autres' }
    ]
  },
  {
    id: 'hairColor',
    title: 'Quelle est la couleur de vos cheveux ?',
    subtitle: 'Aidez-nous à créer des photos qui vous représentent vraiment. Si votre couleur de cheveux ne correspond pas exactement à l\'une des options, choisissez celle qui s\'en rapproche le plus.',
    options: [
      { value: 'brown', label: 'Marron', color: '#8B4513' },
      { value: 'black', label: 'Noir', color: '#000000' },
      { value: 'blonde', label: 'Blonde', color: '#F4C542' },
      { value: 'gray', label: 'Gris', color: '#808080' },
      { value: 'auburn', label: 'Auburn', color: '#A52A2A' },
      { value: 'red', label: 'Rouge', color: '#FF4500' },
      { value: 'white', label: 'Blanc', color: '#FFFFFF' },
      { value: 'other', label: 'Autres', color: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)' },
      { value: 'bald', label: 'Chauve', color: 'transparent' }
    ]
  },
  {
    id: 'hairLength',
    title: 'Quelle est la longueur de vos cheveux ?',
    subtitle: 'Aidez-nous à créer des photos qui vous représentent vraiment. Si votre longueur de cheveux se situe entre deux options, choisissez celle qui s\'en rapproche le plus.',
    hasImages: true,
    options: [
      { value: 'bald', label: 'Chauve' },
      { value: 'buzz', label: 'Coupe Buzz' },
      { value: 'short', label: 'Court' },
      { value: 'medium', label: 'Longueur moyenne' },
      { value: 'long', label: 'Longues' }
    ]
  },
  {
    id: 'hairStyle',
    title: 'Quel est votre type de cheveux ?',
    subtitle: 'Aidez-nous à créer des photos qui vous représentent vraiment. Si votre type de cheveux se situe entre deux options, choisissez celle qui s\'en rapproche le plus.',
    hasImages: true,
    options: [
      { value: 'straight', label: 'Droit' },
      { value: 'wavy', label: 'Ondulé' },
      { value: 'curly', label: "Boucles d'oreilles" },
      { value: 'dreadlocks', label: 'Dreadlocks' }
    ]
  }
];

export default function CreateCharacter() {
  const [currentStep, setCurrentStep] = useState(0);
  const [characterData, setCharacterData] = useState<CharacterData>({
    age: '',
    ethnicity: '',
    hairLength: '',
    hairStyle: '',
    gender: '',
    hairColor: ''
  });

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleOptionSelect = (value: string) => {
    setCharacterData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleContinue = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Terminer et passer à l'étape suivante (génération d'images)
      console.log('Character data:', characterData);
      // Ici on pourrait rediriger vers la page de génération d'images ou sauvegarder les données
      alert('Personnage créé ! Données: ' + JSON.stringify(characterData, null, 2));
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

  const renderOption = (option: any, index: number) => {
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
              fontWeight: '500',
              color: '#333',
              verticalAlign: 'middle'
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
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Header with progress */}
        <_Builtin.Block
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <_Builtin.BlockContainer
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Back button */}
            <_Builtin.Block
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: currentStep > 0 ? 'pointer' : 'default',
                opacity: currentStep > 0 ? 1 : 0.5,
                color: '#666'
              }}
            >
              <span>←</span>
              <span>Retour</span>
            </_Builtin.Block>

            {/* Progress indicator */}
            <_Builtin.Block
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FF6B35',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
            >
              {currentStep + 1}
            </_Builtin.Block>
          </_Builtin.BlockContainer>

          {/* Progress bar */}
          <_Builtin.Block
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e0e0e0',
              marginTop: '16px',
              borderRadius: '2px',
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
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}
          >
            {currentQuestion.title}
          </_Builtin.Block>

          {/* Question subtitle */}
          <_Builtin.Block
            tag="p"
            style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.5',
              maxWidth: '600px',
              margin: '0 auto 40px auto'
            }}
          >
            {currentQuestion.subtitle}
          </_Builtin.Block>

          {/* Options grid */}
          <_Builtin.Block
            style={{
              display: 'grid',
              gridTemplateColumns: currentQuestion.id === 'age' || currentQuestion.id === 'ethnicity' 
                ? 'repeat(auto-fit, minmax(280px, 1fr))' 
                : currentQuestion.hasImages 
                ? 'repeat(auto-fit, minmax(200px, 1fr))'
                : '1fr',
              gap: '16px',
              marginBottom: '40px',
              textAlign: 'left'
            }}
          >
            {currentQuestion.options.map(renderOption)}
          </_Builtin.Block>

          {/* Continue button */}
          <_Builtin.Block
            onClick={handleContinue}
            style={{
              backgroundColor: getCurrentValue() ? '#FF6B35' : '#ccc',
              color: 'white',
              padding: '16px 48px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: getCurrentValue() ? 'pointer' : 'not-allowed',
              border: 'none',
              transition: 'background-color 0.2s ease',
              display: 'inline-block'
            }}
          >
            {currentStep === QUESTIONS.length - 1 ? 'Terminer' : 'Continuer'}
          </_Builtin.Block>
        </_Builtin.BlockContainer>
      </_Builtin.Block>
    </>
  );
} 