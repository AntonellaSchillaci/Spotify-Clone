export const getUserProfile = async (token: string) => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Token non valido o scaduto");
    }
  
    const data = await res.json();
    return data;
  };
  