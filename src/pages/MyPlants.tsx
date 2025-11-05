import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage, PlantScan } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp } from 'lucide-react';

const MyPlants = () => {
  const [scans, setScans] = useState<PlantScan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setScans(storage.getScans());
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = {
    total: scans.length,
    high: scans.filter(s => s.severity === 'high').length,
    medium: scans.filter(s => s.severity === 'medium').length,
    low: scans.filter(s => s.severity === 'low').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">My Plants</h2>
          <p className="text-muted-foreground">
            Track your plant health history and scans
          </p>
        </div>

        {scans.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Scans</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{stats.high}</p>
              <p className="text-xs text-muted-foreground">High Severity</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">{stats.medium}</p>
              <p className="text-xs text-muted-foreground">Medium Severity</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{stats.low}</p>
              <p className="text-xs text-muted-foreground">Low Severity</p>
            </Card>
          </div>
        )}

        {scans.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">No plants scanned yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Start scanning your plants to build your health history
                </p>
              </div>
              <Button onClick={() => navigate('/scan')} size="lg">
                Scan Your First Plant
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {scans.map((scan) => (
              <Card
                key={scan.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/scan/${scan.id}`)}
              >
                <div className="flex gap-4">
                  <img
                    src={scan.imageUrl}
                    alt={scan.plantName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground truncate">
                        {scan.plantName}
                      </h4>
                      <Badge className={getSeverityColor(scan.severity)}>
                        {scan.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{scan.diseaseDetected}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(scan.scannedAt).toLocaleDateString()} at{' '}
                      {new Date(scan.scannedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyPlants;
