import Layout from '@/components/layout/Layout';
import CreatePost from '@/components/home/CreatePost';
import PostCard from '@/components/home/PostCard';
import SidebarStats from '@/components/home/SidebarStats';
import { useEffect, useState } from 'react';

const Index = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/journeys/');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data.map((j: any) => ({
          id: j.id,
          user: {
            name: j.user,
            location: j.location || '',
          },
          content: j.description,
          image: j.image, // Use the full URL from backend
          timestamp: new Date(j.timestamp).toLocaleString(),
          likes: 0,
          comments: 0,
          wasteType: j.waste_type,
          feeling: j.feeling,
        })));
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="max-w-2xl mx-auto">
              <CreatePost onPost={fetchPosts} />
              <div className="space-y-4">
                {loading ? (
                  <div>Loading...</div>
                ) : posts.length === 0 ? (
                  <div>No journeys yet.</div>
                ) : (
                  posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
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
