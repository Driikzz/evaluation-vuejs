const BASE_URL = "http://localhost:3000";


export async function createReservation(reservation) {
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
}

export async function getReservationByToken(token) {
  try {
    const response = await fetch(`${BASE_URL}/reservations/by-token/${token}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching reservation by token:", error);
    throw error;
  }
}

export async function cancelReservation(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/reservations/${id}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return response.json();
  } catch (error) {
    console.error("Error canceling reservation:", error);
    throw error;
  }
}