import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Zap, MapPin, Smile } from 'lucide-react';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState('');

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
      const res = await fetch('http://localhost:8000/api/journeys/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: (() => {
          const form = new FormData();
          form.append('description', content);
          // TODO: support image upload
          return form;
        })(),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Journey posted!');
        setContent('');
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
          {message && <div className="text-sm text-red-500 mt-2">{message}</div>}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Camera className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Zap className="h-4 w-4 mr-2" />
                AI Classify
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
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
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;