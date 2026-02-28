export interface RepoInfo {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export async function checkGitHubRepo(url: string): Promise<RepoInfo | null> {
  try {
    // Extract owner and repo from URL
    // Supports: 
    // https://github.com/owner/repo
    // github.com/owner/repo
    // owner/repo
    
    let path = '';
    if (url.includes('github.com')) {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      path = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
    } else {
      path = url;
    }

    const segments = path.split('/').filter(Boolean);
    if (segments.length < 2) return null;

    const owner = segments[0];
    const repo = segments[1];

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking GitHub repo:', error);
    return null;
  }
}

export async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
      },
    });
    if (!response.ok) {
      console.error('GitHub README fetch failed:', response.status, response.statusText);
      return null;
    }
    const content = await response.text();
    console.log('Successfully fetched README, length:', content.length);
    return content;
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}
