/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function AlbumsClient() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("/api/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Albums (Client)</h2>
      <ul className="space-y-1">
        {albums.map((album: any) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
}
