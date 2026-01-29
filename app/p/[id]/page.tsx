interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PastePage({ params }: PageProps) {
  const { id } = await params; // ✅ IMPORTANT FIX

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div style={{ textAlign: "center", marginTop: "40vh" }}>
        <h2>Paste not found</h2>
      </div>
    );
  }

  const data = await res.json();
  
  return (
    <main
      style={{
        minHeight: "100vh",
         // SINGLE clean background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "70px",
      }}
    >
      {/* PASTE CREATED */}
      <h1
        style={{
          fontSize: "70px",
          fontWeight: "800",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#ff00c8",
          fontFamily: "'Extra-Bold Italic', Tango BT",
          marginBottom: "25px",
        }}
      >
        Paste Created
      </h1>

      {/* PASTE ID LINE */}
      <div
        style={{
          fontSize: "40px",
          fontFamily: "'Montserrat', sans-serif",
          marginBottom: "45px",
        }}
      >
        <span style={{ color: "#111010", fontWeight: "600" }}>
          Paste ID :
        </span>
        <span
          style={{
            color: "#e5f5f2",
            fontWeight: "700",
            marginLeft: "8px",
          }}
        >
          {id}
        </span>
      </div>

      {/* MESSAGE BOX */}
      <div
        style={{
          background: "#e770e1",
          width: "1200px",
          borderRadius: "29px",
          padding: "38px",
          boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "40px",
            fontWeight: "700",
            color: "#621da3",
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Message
        </h3>

        <pre
          style={{
            background: "#ffffffe0",
            padding: "18px",
            borderRadius: "12px",
            fontSize: "30px",
            color: "#000000",
            fontFamily: "'Consolas', monospace",
            whiteSpace: "pre-wrap",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          {data.content}
        </pre>
      </div>
    </main>
  );
}
