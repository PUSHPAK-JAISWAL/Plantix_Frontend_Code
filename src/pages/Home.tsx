import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage, PlantScan } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Clock, TrendingUp, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const [recentScans, setRecentScans] = useState<PlantScan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const scans = storage.getScans().slice(0, 3);
    setRecentScans(scans);
  }, []);

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
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to PlantHealth
          </h2>
          <p className="text-muted-foreground mb-4">
            Scan your plants to detect diseases and get treatment recommendations
          </p>
          <Button 
            onClick={() => navigate('/scan')}
            size="lg"
            className="w-full sm:w-auto"
          >
            Start Scanning
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Scans
            </h3>
            {recentScans.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/my-plants')}
              >
                View All
              </Button>
            )}
          </div>

          {recentScans.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">No scans yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start scanning your plants to track their health
                  </p>
                </div>
                <Button onClick={() => navigate('/scan')} className="mt-2">
                  Scan Your First Plant
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {recentScans.map((scan) => (
                <Card 
                  key={scan.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/scan/${scan.id}`)}
                >
                  <div className="flex gap-4">
                    <img 
                      src={scan.imageUrl} 
                      alt={scan.plantName}
                      className="w-20 h-20 rounded-lg object-cover"
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
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <AlertCircle className="h-4 w-4" />
                        <span className="truncate">{scan.diseaseDetected}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(scan.scannedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
          <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
            <Book className="h-5 w-5 text-accent" />
            Disease Library
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Browse common plant diseases and learn how to prevent them
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/library')}
            className="w-full sm:w-auto"
          >
            Explore Library
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
