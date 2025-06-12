import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface SurveyData {
  roofAge: string;
  squareFootage: string;
  roofStyle: string;
  knownDamage: string;
  urgency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  estimatedCost?: {
    low: number;
    high: number;
  };
  aiAnalysis?: string;
}

export async function saveSurveyResponse(data: SurveyData) {
  try {
    const docRef = await addDoc(collection(db, 'surveys'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new',
      isContacted: false,
      source: 'website'
    });
    
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error('Error saving survey response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 