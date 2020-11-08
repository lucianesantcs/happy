function saveOrphanage(
  db,
  { name, lat, lng, about, whatsapp, images, instructions, opening_hours, open_on_weekends }
) {
  return db.run(`
  INSERT INTO orphanages (
    name,
    lat,
    lng,
    about,
    whatsapp,
    images,
    instructions,
    opening_hours,
    open_on_weekends
  ) VALUES (
    "${name}",
    "${lat}",
    "${lng}",
    "${about}",
    "${whatsapp}",
    "${images}",
    "${instructions}",
    "${opening_hours}",
    "${open_on_weekends}"
  );
`);
}

module.exports = saveOrphanage;
