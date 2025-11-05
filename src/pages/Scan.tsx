import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { storage, diseaseDatabase } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);

    // Simulate AI processing
    setTimeout(() => {
      // Randomly select a disease from database
      const randomDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
      
      const scan = storage.addScan({
        plantName: randomDisease.affectedPlants[0],
        diseaseDetected: randomDisease.name,
        severity: randomDisease.severity,
        imageUrl: imagePreview || randomDisease.imageUrl,
        symptoms: randomDisease.symptoms,
        treatment: randomDisease.treatment,
        preventionTips: randomDisease.prevention,
      });

      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: `Detected: ${randomDisease.name}`,
      });
      
      navigate(`/scan/${scan.id}`);
    }, 2500);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Scan Your Plant</h2>
          <p className="text-muted-foreground">
            Upload a photo of your plant to detect diseases and get treatment advice
          </p>
        </div>

        <Card className="p-6">
          {!imagePreview ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Take or upload a photo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Capture your plant's leaves or affected areas
                    </p>
                  </div>
                  <label htmlFor="image-upload">
                    <Button asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photo
                      </span>
                    </Button>
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-sm text-foreground mb-2">Tips for best results:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Focus on affected areas</li>
                  <li>• Capture leaves clearly</li>
                  <li>• Avoid blurry images</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Plant preview" 
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setImagePreview('')}
                  disabled={isScanning}
                >
                  Retake Photo
                </Button>
                <Button
                  className="flex-1"
                  onClick={simulateScan}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Start Scan'
                  )}
                </Button>
              </div>

              {isScanning && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-center text-muted-foreground">
                    Analyzing plant health and detecting diseases...
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="p-4 bg-accent/5 border-accent/20">
          <p className="text-sm text-muted-foreground text-center">
            <strong className="text-foreground">Note:</strong> This is a demo app. 
            Results are simulated for demonstration purposes.
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default Scan;
