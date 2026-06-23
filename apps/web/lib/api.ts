// Simple fetch wrapper for the Next.js app to talk to our API services

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:80/api';

export const api = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    let baseUrl = API_BASE_URL;
    
    // In development without Nginx, we need to route to specific service ports
    if (process.env.NODE_ENV === 'development') {
        const serviceMap: Record<string, string> = {
            '/food': 'http://localhost:3006',
            '/marketplace': 'http://localhost:3002',
            '/hostel': 'http://localhost:3005',
            '/auth': 'http://localhost:3001',
            '/skillswap': 'http://localhost:3007',
            '/logistics': 'http://localhost:3003',
            '/wallet': 'http://localhost:3004',
            '/payment': 'http://localhost:3004',
        };
        const prefix = Object.keys(serviceMap).find(k => endpoint.startsWith(k));
        if (prefix) {
            baseUrl = serviceMap[prefix];
            // If the baseUrl includes /api, we might need to adjust endpoint
            // But here the serviceMap points to the root of the service
            endpoint = endpoint.replace(prefix, ''); 
        }
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
  }
};
