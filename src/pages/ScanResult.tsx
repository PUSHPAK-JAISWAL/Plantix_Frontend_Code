import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage, PlantScan } from '@/lib/localStorage';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Shield, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ScanResult = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scan, setScan] = useState<PlantScan | null>(null);

  useEffect(() => {
    if (id) {
      const scanData = storage.getScanById(id);
      if (scanData) {
        setScan(scanData);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (id) {
      storage.deleteScan(id);
      toast({
        title: "Scan deleted",
        description: "The scan has been removed from your history",
      });
      navigate('/my-plants');
    }
  };

  if (!scan) {
    return null;
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
          <h2 className="text-2xl font-bold text-foreground">Scan Results</h2>
        </div>

        <Card className="overflow-hidden">
          <img 
            src={scan.imageUrl} 
            alt={scan.plantName}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {scan.plantName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Scanned on {new Date(scan.scannedAt).toLocaleDateString()}
                </p>
              </div>
              <Badge className={getSeverityColor(scan.severity)}>
                {scan.severity} severity
              </Badge>
            </div>

            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Disease Detected
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {scan.diseaseDetected}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Symptoms Observed
          </h4>
          <ul className="space-y-2">
            {scan.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-success/5 border-success/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Treatment Recommendations
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {scan.treatment}
          </p>
        </Card>

        <Card className="p-6 bg-accent/5 border-accent/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Prevention Tips
          </h4>
          <ul className="space-y-2">
            {scan.preventionTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Scan
        </Button>
      </div>
    </Layout>
  );
};

export default ScanResult;
