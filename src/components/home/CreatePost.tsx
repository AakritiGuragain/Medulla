import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Zap, MapPin, Smile } from 'lucide-react';

interface CreatePostProps {
  onPost?: () => void;
}

const CreatePost = ({ onPost }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showFeeling, setShowFeeling] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedFeeling, setSelectedFeeling] = useState<string>('');
  const [availableFeelings, setAvailableFeelings] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAIClassification = async () => {
    if (!image) {
      setMessage('Please upload an image first.');
      return;
    }
    
    setIsClassifying(true);
    setMessage('');
    const token = localStorage.getItem('access');
    
    try {
      const form = new FormData();
      form.append('image', image);
      
      const res = await fetch('http://localhost:8000/api/ai-classify/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form,
      });
      
      const data = await res.json();
      if (res.ok) {
        setClassificationResult(data);
        setMessage(`AI classified as: ${data.waste_type} (${data.confidence.toFixed(1)}% confidence)`);
      } else {
        setMessage(data.detail || 'AI classification failed.');
      }
    } catch (err) {
      setMessage('Network error during AI classification.');
    }
    setIsClassifying(false);
  };

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    setMessage('');
    
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser.');
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const token = localStorage.getItem('access');
        try {
          const res = await fetch('http://localhost:8000/api/location/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          });
          
          const data = await res.json();
          if (res.ok) {
            setSelectedLocation(data.address);
            setMessage(`Location set: ${data.address}`);
          } else {
            setMessage(data.detail || 'Failed to get location.');
          }
        } catch (err) {
          setMessage('Network error getting location.');
        }
        setIsGettingLocation(false);
      },
      (error) => {
        setMessage('Failed to get location: ' + error.message);
        setIsGettingLocation(false);
      }
    );
  };

  const handleGetFeelings = async () => {
    const token = localStorage.getItem('access');
    try {
      const res = await fetch('http://localhost:8000/api/feelings/', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      const data = await res.json();
      if (res.ok) {
        setAvailableFeelings(data.feelings);
      } else {
        setMessage('Failed to load feelings.');
      }
    } catch (err) {
      setMessage('Network error loading feelings.');
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    setMessage('');
    const token = localStorage.getItem('access');
    if (!token) {
      setMessage('You must be logged in to post.');
      setIsPosting(false);
      return;
    }
    try {
      const form = new FormData();
      form.append('description', content);
      if (image) form.append('image', image);
      if (selectedLocation) form.append('location', selectedLocation);
      if (selectedFeeling) form.append('feeling', selectedFeeling);
      if (classificationResult) form.append('waste_type', classificationResult.waste_type);
      
      const res = await fetch('http://localhost:8000/api/journeys/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Journey posted!');
        setContent('');
        clearImage();
        setClassificationResult(null);
        setSelectedLocation('');
        setSelectedFeeling('');
        if (onPost) onPost();
      } else {
        setMessage(data.detail || 'Failed to post.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setIsPosting(false);
  };

  return (
    <Card className="reloop-card p-6 mb-6">
      <div className="flex space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground">
            You
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="Share your waste transformation journey, ask questions, or inspire the community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-border focus:border-primary"
          />
          {imagePreview && (
            <div className="mb-2 relative">
              <img src={imagePreview} alt="Preview" className="max-h-40 rounded" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                onClick={clearImage}
              >
                ×
              </Button>
            </div>
          )}
          {message && <div className="text-sm text-red-500 mt-2">{message}</div>}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <input
                type="file"
                accept="image/jpeg,image/png"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${showAI ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
                type="button"
                onClick={() => setShowAI(!showAI)}
              >
                <Zap className="h-4 w-4 mr-2" />
                AI Classify
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${showLocation ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
                type="button"
                onClick={() => setShowLocation(!showLocation)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${showFeeling ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
                type="button"
                onClick={() => {
                  setShowFeeling(!showFeeling);
                  if (!availableFeelings.length) handleGetFeelings();
                }}
              >
                <Smile className="h-4 w-4 mr-2" />
                Feeling
              </Button>
            </div>
            <Button 
              onClick={handlePost}
              disabled={!content.trim() || isPosting}
              className="min-w-[80px]"
            >
              {isPosting ? 'Posting...' : 'Post'}
            </Button>
          </div>
          
          {/* AI Classify Panel */}
          {showAI && (
            <div className="p-3 bg-muted rounded-lg">
              {!image ? (
                <p className="text-sm text-muted-foreground">Upload an image first to classify with AI</p>
              ) : (
                <div className="space-y-3">
                  <Button 
                    size="sm" 
                    onClick={handleAIClassification}
                    disabled={isClassifying}
                  >
                    {isClassifying ? 'Classifying...' : 'Classify with AI'}
                  </Button>
                  {classificationResult && (
                    <div className="bg-background p-3 rounded">
                      <p className="font-medium">{classificationResult.waste_type}</p>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {classificationResult.confidence.toFixed(1)}% | 
                        Points: {classificationResult.points_per_kg}/kg
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Location Panel */}
          {showLocation && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="space-y-3">
                <Button 
                  size="sm" 
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? 'Getting Location...' : 'Get Current Location'}
                </Button>
                {selectedLocation && (
                  <div className="bg-background p-3 rounded">
                    <p className="text-sm">📍 {selectedLocation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Feeling Panel */}
          {showFeeling && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                {availableFeelings.map((feeling) => (
                  <Button
                    key={feeling}
                    variant={selectedFeeling === feeling ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFeeling(feeling)}
                  >
                    {feeling}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;