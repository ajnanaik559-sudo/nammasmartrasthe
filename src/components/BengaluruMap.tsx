function BengaluruMap() {
  const silkBoardLat = 12.9177;
  const silkBoardLng = 77.6230;

  return (
    <div className="p-4 border border-border rounded-md shadow-md bg-card">
      <h3 className="text-lg font-bold text-foreground mb-2">Bengaluru Junction Map (OSM)</h3>
      <iframe
        title="Silk Board Junction Map"
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: "8px" }}
        loading="lazy"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${silkBoardLng - 0.02},${silkBoardLat - 0.015},${silkBoardLng + 0.02},${silkBoardLat + 0.015}&layer=mapnik&marker=${silkBoardLat},${silkBoardLng}`}
      />
    </div>
  );
}

export default BengaluruMap;
