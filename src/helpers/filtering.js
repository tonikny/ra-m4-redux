const byType = (house, type) => (type ? type === house.type : true)

const byCity = (house, city) => (city ? city === house.city : true)

const applyFilters = (house, type, city) =>
  !!(byType(house, type) && byCity(house, city))

export default applyFilters
