import React from 'react';
import { LearningResource } from '@/src/type/products';
import { View } from './view';

async function getResources(): Promise<LearningResource[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/learning-resources`, {
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    // Return empty array in case of error
    return [];
  }
}

const LMSPage = async () => {
  const resources = await getResources();
  return <View resources={resources} />;
};

export default LMSPage;
