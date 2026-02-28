
const DEV_TO_API_BASE = '/devto-api';

export interface DevToArticle {
  title: string;
  body_markdown: string;
  published: boolean;
  main_image?: string;
  tags?: string[];
}

export async function publishToDevTo(apiKey: string, article: DevToArticle) {
  try {
    const response = await fetch(`${DEV_TO_API_BASE}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({ article }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to publish to DEV.to');
    }

    return await response.json();
  } catch (error) {
    console.error('Error publishing to DEV.to:', error);
    throw error;
  }
}

export async function getDevToUserProfile(apiKey: string) {
  try {
    const response = await fetch(`${DEV_TO_API_BASE}/users/me`, {
      headers: {
        'api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API Key');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching DEV.to profile:', error);
    throw error;
  }
}
