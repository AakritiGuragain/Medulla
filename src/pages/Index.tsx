import Layout from '@/components/layout/Layout';
import CreatePost from '@/components/home/CreatePost';
import PostCard from '@/components/home/PostCard';
import SidebarStats from '@/components/home/SidebarStats';

const Index = () => {
  // Sample data - in a real app this would come from an API
  const samplePosts = [
    {
      id: '1',
      user: {
        name: 'Maya Sharma',
        location: 'Thamel, Kathmandu',
      },
      content: '🌱 Just dropped off 5kg of plastic bottles at the smart collection point! The AI scanner identified them perfectly and I earned 125 points. These will go toward my goal of getting art supplies for my daughter. Love how technology is making recycling so rewarding! 💚',
      wasteType: 'Plastic Bottles',
      points: 125,
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      isLiked: true,
    },
    {
      id: '2',
      user: {
        name: 'Rajesh Thapa',
        location: 'Patan, Lalitpur',
      },
      content: 'Amazing to see the ReLoop community growing! Today I helped my neighbor set up their first waste classification. The impact we\'re making together is incredible. 🔄♻️',
      timestamp: '4 hours ago',
      likes: 18,
      comments: 5,
      image: 'https://www.unicef.org/nepal/sites/unicef.org.nepal/files/styles/two_column/public/UNICEF%20Jajarkot%20and%20West%20Rukum_Aug%202024-00723.webp?itok=ISGl61bb',
    },
    {
      id: '3',
      user: {
        name: 'Siema Gurung',
        location: 'Bhaktapur',
      },
      content: 'Transformed old electronic waste into beautiful art pieces! Check out this lamp made from discarded computer parts. Now selling at the ReLoop Bazar 🎨✨',
      wasteType: 'Electronics',
      points: 200,
      timestamp: '1 day ago',
      likes: 45,
      comments: 12,
      image: 'https://content.instructables.com/FMT/W0Z0/JJ8U54R4/FMTW0Z0JJ8U54R4.jpg?auto=webp',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="max-w-2xl mx-auto">
              <CreatePost />
              
              <div className="space-y-4">
                {samplePosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Load more indicator */}
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-muted rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarStats />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
