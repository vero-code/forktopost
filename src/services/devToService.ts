const DEV_TO_API_BASE = '/devto-api';

export interface DevToArticle {
  title: string;
  body_markdown: string;
  published: boolean;
  main_image?: string;
  cover_image?: string;
  tags?: string[];
  description?: string;
}

export async function publishToDevTo(apiKey: string, article: DevToArticle) {
  // console.log("Publishing to DEV.to with metadata:", { 
  //   title: article.title, 
  //   tags: article.tags, 
  //   main_image: article.main_image,
  //   cover_image: article.cover_image,
  //   body_length: article.body_markdown?.length
  // });

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
      console.error("DEV.to API error response:", response.status, errorData);
      throw new Error(errorData.error || `Failed to publish to DEV.to (Status: ${response.status})`);
    }

    const result = await response.json();
    // console.log("DEV.to publication successful! Article URL:", result.url);
    return result;
  } catch (error) {
    console.error('Error publishing to DEV.to (catch block):', error);
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
