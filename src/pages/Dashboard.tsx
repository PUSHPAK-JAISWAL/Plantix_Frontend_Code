import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { storage, PlantScan } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Activity, 
  Shield, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const [scans, setScans] = useState<PlantScan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setScans(storage.getScans());
  }, []);

  const stats = {
    total: scans.length,
    healthy: scans.filter(s => s.severity === 'low').length,
    warning: scans.filter(s => s.severity === 'medium').length,
    critical: scans.filter(s => s.severity === 'high').length,
  };

  const healthScore = scans.length > 0 
    ? Math.round(((stats.healthy * 100) + (stats.warning * 50)) / scans.length)
    : 0;

  const recentActivity = scans.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your plant health and track progress
          </p>
        </div>

        {/* Health Score */}
        <Card className="p-6 gradient-card border-border/50 glow-effect">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Overall Health Score</h3>
              <p className="text-sm text-muted-foreground">Based on your recent scans</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Health Status</span>
              <span className="text-2xl font-bold text-primary">{healthScore}%</span>
            </div>
            <Progress value={healthScore} className="h-3" />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Scans</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.healthy}</p>
                <p className="text-xs text-muted-foreground">Healthy</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.warning}</p>
                <p className="text-xs text-muted-foreground">Warning</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.critical}</p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 gradient-card border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </h3>
            {recentActivity.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/my-plants')}
              >
                View All
              </Button>
            )}
          </div>

          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">No scans yet. Start scanning to see activity!</p>
              <Button onClick={() => navigate('/scan')} className="mt-4">
                Start Scanning
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((scan, index) => (
                <div 
                  key={scan.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer"
                  onClick={() => navigate(`/scan/${scan.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={scan.imageUrl} 
                    alt={scan.plantName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{scan.plantName}</p>
                    <p className="text-xs text-muted-foreground truncate">{scan.diseaseDetected}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    scan.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                    scan.severity === 'medium' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    {scan.severity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 gradient-primary text-primary-foreground"
            onClick={() => navigate('/scan')}
          >
            <Activity className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-1">Scan a Plant</h3>
            <p className="text-sm opacity-90">Detect diseases instantly</p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-accent text-accent-foreground"
            onClick={() => navigate('/library')}
          >
            <Shield className="h-8 w-8 mb-3" />
            <h3 className="font-semibold mb-1">Disease Library</h3>
            <p className="text-sm opacity-90">Learn about plant diseases</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
