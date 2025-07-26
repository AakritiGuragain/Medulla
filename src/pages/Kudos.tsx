import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Heart, 
  Share2, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Gift,
  Volume2,
  Eye,
  Star,
  Users,
  Recycle,
  Search,
  Filter
} from 'lucide-react';

interface Recycler {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  joinDate: string;
  totalPoints: number;
  wasteRecycled: number; // in kg
  impactScore: number;
  achievements: string[];
  bio: string;
  specialties: string[];
  recentActivity: {
    date: string;
    action: string;
    points: number;
  }[];
  stories: {
    id: string;
    title: string;
    content: string;
    image?: string;
    date: string;
    likes: number;
    hasAudio: boolean;
  }[];
}

const Kudos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRecycler, setSelectedRecycler] = useState<Recycler | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);

  const recyclers: Recycler[] = [
    {
      id: '1',
      name: 'Maya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      location: 'Thamel, Kathmandu',
      joinDate: 'January 2024',
      totalPoints: 12450,
      wasteRecycled: 890,
      impactScore: 95,
      achievements: ['Top Recycler', 'Community Leader', 'Environmental Champion'],
      bio: 'Mother of two passionate about creating a cleaner Kathmandu. Started recycling to teach my children about environmental responsibility.',
      specialties: ['Plastic Separation', 'Organic Composting', 'Community Education'],
      recentActivity: [
        { date: '2 hours ago', action: 'Recycled 15kg plastic bottles', points: 375 },
        { date: '1 day ago', action: 'Helped neighbor with composting', points: 100 },
        { date: '3 days ago', action: 'Attended recycling workshop', points: 50 }
      ],
      stories: [
        {
          id: '1',
          title: 'From Waste to Wonder: My Journey',
          content: 'When I first started with ReLoop, I never imagined how transformative it would be. Not just for the environment, but for my entire family. My children now eagerly help me separate waste, and we\'ve turned it into a fun family activity. Last month, we earned enough points to buy art supplies, and my daughter created a beautiful sculpture from recycled materials.',
          image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
          date: '1 week ago',
          likes: 127,
          hasAudio: true
        }
      ]
    },
    {
      id: '2',
      name: 'Rajesh Thapa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Patan, Lalitpur',
      joinDate: 'March 2024',
      totalPoints: 8920,
      wasteRecycled: 560,
      impactScore: 88,
      achievements: ['Tech Innovator', 'Electronics Expert', 'Mentor'],
      bio: 'Electronics engineer who found a second passion in e-waste recycling. Building smart solutions for better waste management.',
      specialties: ['E-waste Processing', 'Circuit Upcycling', 'Tech Education'],
      recentActivity: [
        { date: '4 hours ago', action: 'Processed old smartphones', points: 600 },
        { date: '2 days ago', action: 'Built LED lamp from e-waste', points: 300 }
      ],
      stories: [
        {
          id: '2',
          title: 'Electronics Second Life',
          content: 'Every broken phone or computer has potential. Through ReLoop, I\'ve learned to see beyond the "broken" label. Last month, I created functional LED lamps from old circuit boards that now light up my neighborhood tea shop. The owner was amazed that waste could become something so beautiful and useful.',
          date: '3 days ago',
          likes: 89,
          hasAudio: false
        }
      ]
    },
    {
      id: '3',
      name: 'Anita Gurung',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Bhaktapur',
      joinDate: 'February 2024',
      totalPoints: 15670,
      wasteRecycled: 1240,
      impactScore: 98,
      achievements: ['Artist Champion', 'Upcycling Master', 'Community Inspirer'],
      bio: 'Traditional artist who discovered the beauty in transforming waste into art. Creating workshops to teach others the art of upcycling.',
      specialties: ['Artistic Upcycling', 'Traditional Crafts', 'Workshop Teaching'],
      recentActivity: [
        { date: '1 hour ago', action: 'Sold upcycled artwork', points: 800 },
        { date: '6 hours ago', action: 'Taught upcycling workshop', points: 200 }
      ],
      stories: [
        {
          id: '3',
          title: 'Art from the Heart of Waste',
          content: 'My grandmother taught me traditional Newari crafts, but I never thought I\'d be using those skills on plastic bottles and electronic parts! Now, I run monthly workshops where community members learn to create beautiful art from their waste. It\'s incredible how a discarded item can become someone\'s treasured decoration.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          date: '5 days ago',
          likes: 203,
          hasAudio: true
        }
      ]
    }
  ];

  const filteredRecyclers = recyclers.filter(recycler => {
    const matchesSearch = recycler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recycler.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recycler.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'top-performers' && recycler.impactScore > 90) ||
                         (selectedFilter === 'artists' && recycler.specialties.some(s => s.includes('Art'))) ||
                         (selectedFilter === 'educators' && recycler.specialties.some(s => s.includes('Education') || s.includes('Teaching')));
    
    return matchesSearch && matchesFilter;
  });

  const handleTipRecycler = (recyclerId: string) => {
    // Simulate tipping with points
    console.log(`Tipping recycler ${recyclerId}`);
  };

  const playStoryAudio = (storyId: string) => {
    setAudioPlaying(audioPlaying === storyId ? null : storyId);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Community <span className="text-primary">Kudos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrate our recycling heroes and their inspiring stories. 
            Support community members through tips and recognition.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recyclers, locations, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All Heroes' },
              { value: 'top-performers', label: 'Top Performers' },
              { value: 'artists', label: 'Artists' },
              { value: 'educators', label: 'Educators' }
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profiles">Recycler Profiles</TabsTrigger>
            <TabsTrigger value="stories">Impact Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecyclers.map((recycler) => (
                <Card key={recycler.id} className="reloop-card p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={recycler.avatar} alt={recycler.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {recycler.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">{recycler.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {recycler.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {recycler.joinDate}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary">{recycler.totalPoints.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Points</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">{recycler.wasteRecycled}kg</div>
                        <div className="text-xs text-muted-foreground">Recycled</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent">{recycler.impactScore}</div>
                        <div className="text-xs text-muted-foreground">Impact</div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground line-clamp-3">{recycler.bio}</p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-1">
                      {recycler.achievements.slice(0, 2).map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Award className="h-2 w-2 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                      {recycler.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{recycler.achievements.length - 2} more
                        </Badge>
                      )}
                    </div>

                    {/* Specialties */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {recycler.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRecycler(recycler)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Profile
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleTipRecycler(recycler.id)}
                      >
                        <Gift className="h-3 w-3 mr-1" />
                        Tip Points
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6 mt-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {recyclers.flatMap(recycler => 
                recycler.stories.map(story => (
                  <Card key={story.id} className="reloop-card p-6">
                    <div className="space-y-4">
                      {/* Story Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={recycler.avatar} alt={recycler.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {recycler.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{recycler.name}</h3>
                            <p className="text-sm text-muted-foreground">{story.date}</p>
                          </div>
                        </div>
                        {story.hasAudio && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playStoryAudio(story.id)}
                            className={audioPlaying === story.id ? 'bg-primary text-primary-foreground' : ''}
                          >
                            <Volume2 className="h-4 w-4 mr-2" />
                            {audioPlaying === story.id ? 'Stop' : 'Listen'}
                          </Button>
                        )}
                      </div>

                      {/* Story Content */}
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-3">{story.title}</h2>
                        {story.image && (
                          <img 
                            src={story.image} 
                            alt={story.title}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                          />
                        )}
                        <p className="text-foreground leading-relaxed">{story.content}</p>
                      </div>

                      {/* Story Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            {story.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTipRecycler(recycler.id)}
                        >
                          <Gift className="h-4 w-4 mr-2" />
                          Tip {recycler.name}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Impact Stats */}
        <Card className="reloop-card p-8 mt-12">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Community Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">247</div>
              <div className="text-sm text-muted-foreground">Active Recyclers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Recycle className="h-8 w-8 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">12,450kg</div>
              <div className="text-sm text-muted-foreground">Total Recycled</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">1,890</div>
              <div className="text-sm text-muted-foreground">Points Tipped</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">156%</div>
              <div className="text-sm text-muted-foreground">Growth This Month</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Kudos;