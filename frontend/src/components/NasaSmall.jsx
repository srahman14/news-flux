import { useEffect, useState } from "react";
import { FaRegImage, FaInfoCircle } from "react-icons/fa";
import axios from "axios";

const Nasasmall = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullText, setShowFullText] = useState(false); 

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/nasa-small")
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch NASA data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={styles.text}>Loading NASA APOD...</p>;
  if (error) return <p style={styles.text}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Astronomy Picture of the Day</h2>

      <h3 style={styles.title}>
        <FaRegImage style={styles.icon} /> {apod.title}
      </h3>

      {apod.media_type === "image" ? (
        <img src={apod.url} alt={apod.title} style={styles.image} />
      ) : (
        <iframe
          title={apod.title}
          src={apod.url}
          frameBorder="0"
          allowFullScreen
          style={styles.image}
        ></iframe>
      )}

      <p
        style={styles.explanation}
        onMouseEnter={() => setShowFullText(true)}
        onMouseLeave={() => setShowFullText(false)}
      >
        {showFullText ? apod.explanation : apod.explanation.substring(0, 120) + "..."}
        <FaInfoCircle style={styles.infoIcon} />
      </p>

      <a href="/nasa" style={styles.link}>See more</a>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
    transition: "transform 0.2s",
    cursor: "default"
  },
  pageTitle: {
    fontSize: "1.6rem",
    marginBottom: "15px",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "12px",
    fontSize: "1.2rem",
    fontWeight: "600"
  },
  icon: {
    color: "#fff"
  },
  infoIcon: {
    marginLeft: "5px",
    color: "#888",
    cursor: "pointer"
  },
  explanation: {
    color: "#ddd",
    fontSize: "0.95rem",
    lineHeight: "1.4rem",
    marginBottom: "15px"
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "12px"
  },
  link: {
    color: "#fff",
    textDecoration: "underline",
    fontWeight: "500"
  },
  text: {
    color: "#fff"
  }
};

export default Nasasmall;