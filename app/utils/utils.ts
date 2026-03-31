export const formatCoordinate = (value: number, axis: 'lat' | 'lng') => {
    const absolute = Math.abs(value).toFixed(4);
    const direction = axis === 'lat'
        ? (value >= 0 ? 'N' : 'S')
        : (value >= 0 ? 'E' : 'W');
    return `${absolute}°${direction}`;
};
