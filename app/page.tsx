"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  async function createPaste() {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text }),
    });

    if (!res.ok) {
      alert("Failed to create paste");
      return;
    }

    const data = await res.json();
    window.location.href = `/p/${data.id}`;
  }

  return (
    <div className="card">
      <h1>📝 Create Paste 📝</h1>

      <textarea
        placeholder="Type your paste here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={createPaste}>Create Paste</button>
    </div>
  );
}
