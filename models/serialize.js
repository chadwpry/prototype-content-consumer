let serializer = (attributes) => {
  return (model) => {
    return {
      "data": {
        "type": model.key.kind,
        "id": model.key.id,
        "attributes": attributes.reduce((previous, attribute) => {
          previous[attribute] = model.data[attribute];
          return previous;
        }, {})
      },
      "jsonapi": "1.0.0"
    };
  };
};

module.exports.selector = serializer([
  'source_id',
  'product_url',
  'product_image_url',
  'product_brand_name',
  'product_brand_url',
  'product_offer',
  'product_offer_currency',
]);
