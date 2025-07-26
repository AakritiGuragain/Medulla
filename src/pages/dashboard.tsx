import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Dashboard = () => {
  const rewardPoints = 1250; // Static for now
  const feed = [
    "Recycled 5 plastic bottles - Earned 50 points",
    "Dropped off e-waste at center - Earned 200 points",
    "Referred a friend - Earned 100 points",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Reward Points</h2>
            <p className="text-2xl font-bold text-green-600">{rewardPoints}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Your Feed</h2>
            <Separator className="mb-2" />
            <ul className="list-disc list-inside space-y-2">
              {feed.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;