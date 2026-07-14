/**
 * Placeholder for an image the owner hasn't dropped in yet (the design ships
 * empty "image slots"). Fills its positioned parent; pass `src` once a real
 * asset exists to swap the label for the image.
 */
export const ImageSlot = ({ label, src, alt = "" }) => {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-paper/[0.02]">
      <span className="px-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/35">
        {label}
      </span>
    </div>
  );
};
