import React, { useState, useEffect } from "react";

const UserProfileFetcher = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch("https://randomuser.me/api/");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setUserData(data.results[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <h1>User Profile Fetcher</h1>
      <button onClick={handleRefresh} style={styles.button}>
        Fetch New User
      </button>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={styles.error}>Failed to fetch user data. Please try again.</p>}

      {userData && !isLoading && !isError && (
        <div style={styles.profile}>
          <img src={userData.picture.large} alt="User" style={styles.image} />
          <h2>
            {userData.name.title} {userData.name.first} {userData.name.last}
          </h2>
          <p>{userData.email}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
  },
  button: {
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
  profile: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1rem",
    display: "inline-block",
  },
  image: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
  },
  error: {
    color: "red",
  },
};

export default UserProfileFetcher;
