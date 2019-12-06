// Create nice PhotoSwipe caption with title and metadata
const formatTitle = pic => {
  const meta = pic.taken_with;
  let title = `${pic.title} <br /><small class="text-muted">`;
  if (meta.camera && meta.camera !== 'unknown')
    title = `${title}${meta.camera}`;
  if (
    meta.focal_length &&
    meta.focal_length !== 'unknown' &&
    meta.focal_length !== '0'
  )
    title = `${title} - ${meta.focal_length}mm `;
  if (meta.aperture && meta.aperture !== 'unknown' && meta.focal_length !== '0')
    title = `${title} - ƒ/${meta.aperture} `;
  if (meta.shutter_speed && meta.shutter_speed !== 'unknown')
    title = `${title} - ${meta.shutter_speed}s. `;
  if (meta.iso && meta.iso !== 'unknown' && meta.focal_length !== '0')
    title = `${title} - ISO ${meta.iso}`;
  title = `${title} © Yann Gouffon</small>`;
  return title;
};

export { formatTitle };
