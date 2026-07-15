import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserLedger() {
      try {
        // Pull your live admin JWT authorization token out of your browser memory
        const token = localStorage.getItem("questlog_token") || localStorage.getItem("token");
        
        const response = await fetch("https://questlog-backend-7tvc.onrender.com/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate administrative connection access privileges.");
        }

        const data = await response.json();
        setRegisteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserLedger();
  }, []);

  return (
    <div className="admin-dashboard-view" style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1.5rem", minHeight: "70vh" }}>
      <header style={{ borderBottom: "2px solid rgba(139, 92, 246, 0.2)", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ color: "#facc15", margin: 0 }}>⚙️ QuestLog Administrative Panel</h1>
        <p style={{ color: "#9ca3af", margin: "4px 0 0 0" }}>Review live database registrations, track account profiles, and audit system credentials metadata logs.</p>
      </header>

      {loading && <p style={{ color: "var(--color-text-accent)" }}>Querying secure Neon database instance engine nodes...</p>}
      {error && <p style={{ color: "#f44336", fontWeight: "bold" }}>❌ Error: {error}</p>}

      {!loading && !error && (
        <div style={{ overflowX: "auto", background: "rgba(15, 23, 42, 0.6)", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ background: "rgba(139, 92, 246, 0.15)", borderBottom: "1px solid rgba(139, 92, 246, 0.2)" }}>
                <th style={{ padding: "12px 16px", color: "#8b5cf6" }}>Database ID</th>
                <th style={{ padding: "12px 16px", color: "#8b5cf6" }}>Username Handle</th>
                <th style={{ padding: "12px 16px", color: "#8b5cf6" }}>Email Registration Link</th>
                <th style={{ padding: "12px 16px", color: "#8b5cf6" }}>Account Clearance</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#9ca3af" }}>#{u.id}</td>
                  <td style={{ padding: "12px 16px", fontWeight: "600" }}>{u.username}</td>
                  <td style={{ padding: "12px 16px", color: "#9ca3af" }}>✉️ {u.email}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ 
                      background: u.is_admin ? "rgba(250, 204, 21, 0.15)" : "rgba(156, 163, 175, 0.1)", 
                      color: u.is_admin ? "#facc15" : "#9ca3af",
                      padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold"
                    }}>
                      {u.is_admin ? "SYSTEM_ADMIN" : "STANDARD_PLAYER"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
