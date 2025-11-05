import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { diseaseDatabase } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

const Library = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = diseaseDatabase.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.affectedPlants.some(plant => 
      plant.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Disease Library</h2>
          <p className="text-muted-foreground">
            Learn about common plant diseases and how to treat them
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search diseases or plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredDiseases.map((disease) => (
            <Card
              key={disease.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/library/${disease.id}`)}
            >
              <img
                src={disease.imageUrl}
                alt={disease.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">
                    {disease.name}
                  </h3>
                  <Badge className={getSeverityColor(disease.severity)}>
                    {disease.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground italic mb-2">
                  {disease.scientificName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Affects: {disease.affectedPlants.slice(0, 2).join(', ')}
                  {disease.affectedPlants.length > 2 && '...'}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No diseases found matching "{searchTerm}"
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Library;
