import { useState } from "react";
import { FaCalendarAlt, FaRegImage, FaPlayCircle } from "react-icons/fa";
import axios from "axios";

const Nasa = () => {
  const [date, setDate] = useState("");
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios.get(`http://127.0.0.1:5000/api/nasa?date=${date}`)
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch NASA data");
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Astronomy Picture of the Day</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <FaCalendarAlt style={styles.calendarIcon} />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get APOD</button>
      </form>

      {loading && <p style={styles.text}>Loading...</p>}
      {error && <p style={styles.text}>{error}</p>}

      {apod && (
        <div style={styles.apodContainer}>
          <h3 style={styles.title}>
            {apod.media_type === "video" ? <FaPlayCircle style={styles.icon} /> : <FaRegImage style={styles.icon} />}
            {apod.title}
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

          <p style={styles.text}>{apod.explanation}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#111",
    minHeight: "100vh",
    color: "#fff",
    padding: "25px",
    textAlign: "center"
  },
  pageTitle: {
    fontSize: "2rem",
    marginBottom: "25px",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "700"
  },
  form: {
    marginBottom: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
  },
  calendarIcon: {
    color: "#fff",
    fontSize: "1.3rem"
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none"
  },
  button: {
    padding: "8px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#fff",
    color: "#111",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s"
  },
  text: {
    color: "#fff"
  },
  apodContainer: {
    marginTop: "25px",
    borderRadius: "15px",
    padding: "25px",
    backgroundColor: "#222",
    display: "inline-block",
    maxWidth: "700px",
    boxShadow: "0 0 20px rgba(255,255,255,0.2)"
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px",
    fontSize: "1.6rem",
    fontWeight: "600"
  },
  icon: {
    color: "#fff"
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px"
  }
};

export default Nasa;