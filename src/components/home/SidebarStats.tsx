import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Award, Recycle, ArrowRight } from 'lucide-react';

const SidebarStats = () => {
  const stats = [
    { label: 'Your Points', value: '1,247', icon: Award, color: 'text-yellow-600' },
    { label: 'Community Members', value: '12.4K', icon: Users, color: 'text-primary' },
    { label: 'Waste Recycled', value: '890 kg', icon: Recycle, color: 'text-success' },
    { label: 'Monthly Growth', value: '+23%', icon: TrendingUp, color: 'text-blue-600' },
  ];

  const quickActions = [
    { label: 'Upload Waste Photo', action: '/what-we-buy', primary: true },
    { label: 'Find Drop Points', action: '/drop-points', primary: false },
    { label: 'Browse Bazar', action: '/bazar', primary: false },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <Card className="reloop-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Your Impact</h3>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="font-semibold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="reloop-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.primary ? "default" : "outline"}
              className="w-full justify-between"
              size="sm"
            >
              {action.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </Card>

      {/* Community Highlight */}
      <Card className="reloop-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Featured Recycler</h3>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-3 flex items-center justify-center">
            <Award className="h-8 w-8 text-primary-foreground" />
          </div>
          <h4 className="font-medium text-foreground">Sarah Chen</h4>
          <p className="text-sm text-muted-foreground mb-3">Top recycler this month</p>
          <div className="text-xs text-muted-foreground">
            Recycled <span className="font-semibold text-success">450kg</span> of waste
          </div>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            View Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SidebarStats;