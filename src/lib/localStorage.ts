export interface PlantScan {
  id: string;
  plantName: string;
  diseaseDetected: string;
  severity: 'low' | 'medium' | 'high';
  imageUrl: string;
  scannedAt: string;
  symptoms: string[];
  treatment: string;
  preventionTips: string[];
}

export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  affectedPlants: string[];
  symptoms: string[];
  causes: string[];
  treatment: string;
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
  imageUrl: string;
}

const SCANS_KEY = 'plantix_scans';

export const storage = {
  getScans: (): PlantScan[] => {
    const scans = localStorage.getItem(SCANS_KEY);
    return scans ? JSON.parse(scans) : [];
  },

  addScan: (scan: Omit<PlantScan, 'id' | 'scannedAt'>): PlantScan => {
    const scans = storage.getScans();
    const newScan: PlantScan = {
      ...scan,
      id: crypto.randomUUID(),
      scannedAt: new Date().toISOString(),
    };
    scans.unshift(newScan);
    localStorage.setItem(SCANS_KEY, JSON.stringify(scans));
    return newScan;
  },

  getScanById: (id: string): PlantScan | undefined => {
    const scans = storage.getScans();
    return scans.find(scan => scan.id === id);
  },

  deleteScan: (id: string): void => {
    const scans = storage.getScans().filter(scan => scan.id !== id);
    localStorage.setItem(SCANS_KEY, JSON.stringify(scans));
  },
};

// Mock disease database
export const diseaseDatabase: Disease[] = [
  {
    id: '1',
    name: 'Leaf Blight',
    scientificName: 'Alternaria solani',
    affectedPlants: ['Tomato', 'Potato', 'Pepper'],
    symptoms: ['Brown spots on leaves', 'Yellow halos around spots', 'Leaf wilting'],
    causes: ['Fungal infection', 'High humidity', 'Poor air circulation'],
    treatment: 'Apply fungicide spray, remove infected leaves, improve air circulation',
    prevention: ['Rotate crops annually', 'Water at soil level', 'Space plants properly', 'Use disease-resistant varieties'],
    severity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400',
  },
  {
    id: '2',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphales',
    affectedPlants: ['Rose', 'Cucumber', 'Squash', 'Grape'],
    symptoms: ['White powdery coating on leaves', 'Stunted growth', 'Leaf distortion'],
    causes: ['Fungal spores', 'Moderate temperatures', 'High humidity'],
    treatment: 'Spray with neem oil or sulfur-based fungicide, prune affected areas',
    prevention: ['Ensure good air flow', 'Avoid overhead watering', 'Plant in full sun', 'Apply preventive fungicides'],
    severity: 'low',
    imageUrl: 'https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=400',
  },
  {
    id: '3',
    name: 'Root Rot',
    scientificName: 'Pythium spp.',
    affectedPlants: ['Most plants', 'Houseplants', 'Vegetables'],
    symptoms: ['Yellowing leaves', 'Wilting despite watering', 'Mushy brown roots', 'Stunted growth'],
    causes: ['Overwatering', 'Poor drainage', 'Fungal pathogens'],
    treatment: 'Reduce watering, improve drainage, remove dead roots, repot in fresh soil',
    prevention: ['Use well-draining soil', 'Water only when needed', 'Ensure proper drainage holes', 'Avoid waterlogging'],
    severity: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
  },
  {
    id: '4',
    name: 'Aphid Infestation',
    scientificName: 'Aphidoidea',
    affectedPlants: ['Roses', 'Vegetables', 'Fruit trees'],
    symptoms: ['Clusters of small insects', 'Curled leaves', 'Sticky honeydew', 'Yellowing foliage'],
    causes: ['Pest infestation', 'Lack of natural predators'],
    treatment: 'Spray with insecticidal soap, introduce ladybugs, use neem oil',
    prevention: ['Encourage beneficial insects', 'Regular monitoring', 'Remove weeds', 'Use companion planting'],
    severity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400',
  },
  {
    id: '5',
    name: 'Bacterial Wilt',
    scientificName: 'Ralstonia solanacearum',
    affectedPlants: ['Tomato', 'Eggplant', 'Potato'],
    symptoms: ['Rapid wilting', 'No leaf yellowing initially', 'Brown vascular tissue'],
    causes: ['Bacterial infection', 'Soil contamination', 'Infected tools'],
    treatment: 'Remove and destroy infected plants, sterilize tools, do not compost affected plants',
    prevention: ['Use disease-free seeds', 'Rotate crops', 'Improve soil drainage', 'Sanitize garden tools'],
    severity: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
  },
  {
    id: '6',
    name: 'Leaf Spot',
    scientificName: 'Cercospora spp.',
    affectedPlants: ['Various plants', 'Ornamentals', 'Vegetables'],
    symptoms: ['Dark spots with yellow borders', 'Premature leaf drop', 'Circular lesions'],
    causes: ['Fungal infection', 'Water splash', 'Humid conditions'],
    treatment: 'Apply copper-based fungicide, remove infected leaves, improve air circulation',
    prevention: ['Water at base of plants', 'Space plants properly', 'Remove debris', 'Use mulch'],
    severity: 'low',
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400',
  },
];
