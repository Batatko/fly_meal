export default async function getMealsData(): Promise<any> {
  const data = await fetch("http://localhost:8080/api/meals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        let errorMessage = "Meal data fetch failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      });
    }
  });

  return data;
}
