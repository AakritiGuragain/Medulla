import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: {
    id: string;
    user: {
      name: string;
      avatar?: string;
      location: string;
    };
    content: string;
    image?: string;
    wasteType?: string;
    points?: number;
    timestamp: string;
    likes: number;
    comments: number;
    isLiked?: boolean;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="reloop-card p-6 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {post.user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{post.user.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground space-x-2">
              <MapPin className="h-3 w-3" />
              <span>{post.user.location}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed">{post.content}</p>
        
        {/* Waste classification badge */}
        {post.wasteType && (
          <div className="mt-3 flex items-center space-x-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <Award className="h-3 w-3 mr-1" />
              {post.wasteType}
            </div>
            {post.points && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-success text-success-foreground text-sm font-medium">
                +{post.points} points
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-4">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isLiked && "text-red-500 hover:text-red-600"
            )}
          >
            <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MessageCircle className="h-4 w-4 mr-2" />
            {post.comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;