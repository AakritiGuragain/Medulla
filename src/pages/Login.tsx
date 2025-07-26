import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Shield, Mail, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if (isLogin) {
      // Login
      try {
        const res = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
          setMessage('Login successful!');
          setTimeout(() => navigate('/'), 500); // Redirect to home after short delay
        } else {
          setMessage(data.detail || 'Login failed.');
        }
      } catch (err) {
        setMessage('Network error.');
      }
    } else {
      // Signup
      try {
        const res = await fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage('Account created! You can now sign in.');
          setIsLogin(true);
        } else {
          setMessage(
            data.username?.[0] || data.email?.[0] || data.password?.[0] || 'Signup failed.'
          );
        }
      } catch (err) {
        setMessage('Network error.');
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Join ReLoop'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Sign in to continue your impact journey'
                : 'Start making a difference in your community'
              }
            </p>
          </div>

          <Card className="reloop-card p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourusername"
                    className="mt-1"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
              {message && <div className="text-center text-sm text-red-500 mt-2">{message}</div>}
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center text-sm text-muted-foreground mb-4">
                Two-Factor Authentication Available
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" type="button">
                  <Mail className="h-4 w-4 mr-2" />
                  Email OTP
                </Button>
                <Button variant="outline" size="sm" type="button">
                  <Smartphone className="h-4 w-4 mr-2" />
                  SMS OTP
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
                className="text-primary hover:underline text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </Card>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to ReLoop's terms of service and privacy policy.
            <br />
            Secure authentication powered by advanced encryption.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;