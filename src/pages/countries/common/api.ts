const getCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v2/all?fields=name,region,area"
    );
    return response.json();
  } catch (err) {
    console.error("Error:", (err as Error)?.message);
    return [];
  }
};

export const api = { getCountries };
