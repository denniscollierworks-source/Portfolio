import { useEffect, useState } from "react";

function RandomJoke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchJoke() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke",
      );

      if (!response.ok) {
        throw new Error(
          `Something went wrong. HTTP status: ${response.status}`,
        );
      }

      const json = await response.json();
      setJoke(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p>There was an issue fetching your data: {error.message}</p>;

  return (
    <div>
      <h2>{joke.setup}</h2>
      <p>{joke.punchline}</p>
      <p>Type: {joke.type}</p>
      <button onClick={fetchJoke}>Get another joke</button>{" "}
    </div>
  );
}

export default RandomJoke;
