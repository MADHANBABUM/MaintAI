const BASE_URL = "http://127.0.0.1:8000";

// ------------------------------------
// Home API
// ------------------------------------

export async function getHome() {
  const response = await fetch(`${BASE_URL}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch Home API");
  }

  return response.json();
}

// ------------------------------------
// Dashboard Stats API
// ------------------------------------

export async function getDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch Dashboard Stats");
  }

  return response.json();
}

// ------------------------------------
// Get All Machines API
// ------------------------------------

export async function getMachines() {
  const response = await fetch(`${BASE_URL}/machines`);

  if (!response.ok) {
    throw new Error("Failed to fetch Machines");
  }

  return response.json();
}
