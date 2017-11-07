SELECT
  id,
  name,
  CASE WHEN description IS NULL
    THEN 'Some Description'
  Else description END AS description,
  image_path,
  flavor_type
FROM flavors
ORDER BY id;