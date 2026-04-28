const LOCAL_BACKEND_URL = "http://localhost:8000";

export function getBackendBaseUrl() {
  const configured = process.env.REACT_APP_BACKEND_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(hostname)) {
      return LOCAL_BACKEND_URL;
    }
    return origin.replace(/\/$/, "");
  }

  return LOCAL_BACKEND_URL;
}

export const API_BASE_URL = `${getBackendBaseUrl()}/api`;
