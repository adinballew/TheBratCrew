SELECT
  inventory.id,
  flavors.id as productId,
  name,
  CASE WHEN description IS NULL
    THEN 'Some Description'
  Else description END AS description,
  image_path,
  flavor_type,
  inventory.size,
  nic,
  price,
  sales
FROM flavors
  INNER JOIN inventory
    ON flavors.id = productid;
