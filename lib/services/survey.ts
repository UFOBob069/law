import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface CaseData {
  firstName: string;
  lastName: string;
  phone: string;
  injuryDescription: string;
  preferredContact: string;
  city: string;
  accidentType: string;
}

export async function saveCaseSubmission(data: CaseData) {
  try {
    const docRef = await addDoc(collection(db, 'cases'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new',
      isContacted: false,
      source: 'website',
      priority: 'high'
    });
    
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error('Error saving case submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 