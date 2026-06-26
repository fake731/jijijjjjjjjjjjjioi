/**
 * Slow-moving cosmic aurora gradient mesh that drifts behind content.
 * Sits above the SpaceBackground but under all UI; non-interactive.
 */
const AuroraOverlay = () => (
  <div aria-hidden className="aurora-overlay">
    <span className="aurora-blob aurora-blob-1" />
    <span className="aurora-blob aurora-blob-2" />
    <span className="aurora-blob aurora-blob-3" />
  </div>
);

export default AuroraOverlay;