SELECT
  id,
  name,
  CASE WHEN description IS NULL
    THEN 'Some Description'
  ELSE description END AS description,
  image_path,
  flavor_type
FROM flavors
LIMIT 4