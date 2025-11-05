import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { diseaseDatabase } from '@/lib/localStorage';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Shield, ArrowLeft, Leaf } from 'lucide-react';

const DiseaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const disease = diseaseDatabase.find(d => d.id === id);

  if (!disease) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Disease not found</p>
          <Button onClick={() => navigate('/library')} className="mt-4">
            Back to Library
          </Button>
        </div>
      </Layout>
    );
  }

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
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold text-foreground">Disease Details</h2>
        </div>

        <Card className="overflow-hidden">
          <img
            src={disease.imageUrl}
            alt={disease.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {disease.name}
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  {disease.scientificName}
                </p>
              </div>
              <Badge className={getSeverityColor(disease.severity)}>
                {disease.severity}
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Affected Plants
          </h4>
          <div className="flex flex-wrap gap-2">
            {disease.affectedPlants.map((plant, index) => (
              <Badge key={index} variant="secondary">
                {plant}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Symptoms
          </h4>
          <ul className="space-y-2">
            {disease.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h4 className="font-semibold text-foreground mb-3">
            Common Causes
          </h4>
          <ul className="space-y-2">
            {disease.causes.map((cause, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-success/5 border-success/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Treatment
          </h4>
          <p className="text-sm text-muted-foreground">
            {disease.treatment}
          </p>
        </Card>

        <Card className="p-6 bg-accent/5 border-accent/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Prevention
          </h4>
          <ul className="space-y-2">
            {disease.prevention.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default DiseaseDetail;
