function calculateDistance(lat1, lon1, lat2, lon2) {
    // Rayon de la Terre en km
    const R = 6371; 
    
    // Convertir les degrés en radians
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    // Calcul des parties de la formule de la Grande Cercle
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Distance en km
    const distance = R * c;
    
    return distance;
}

module.exports = { calculateDistance };
