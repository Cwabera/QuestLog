import "./ScreenshotGallery.css";

function ScreenshotGallery({ screenshots }) {
  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="gallery-empty">
        No screenshots available.
      </div>
    );
  }

  return (
    <section className="screenshot-gallery">
      <h2>Game Screenshots</h2>

      <div className="gallery-grid">
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className="gallery-item"
          >
            <img
              src={screenshot.image}
              alt="Game Screenshot"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScreenshotGallery;