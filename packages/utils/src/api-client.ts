import axios from 'axios';

/**
 * Creates an Axios client configured to talk to internal microservices cleanly.
 */
export const createInternalClient = (serviceBaseUrl: string) => {
  return axios.create({
    baseURL: serviceBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Service': 'true' // Custom header to bypass certain external guards if needed
    }
  });
};
