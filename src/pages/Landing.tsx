import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Wallet, Chrome, Twitter } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Landing() {
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = (method: string) => {
    login(method);
    navigate('/today');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-16">
          <h1 className="mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Varenith
          </h1>
          <p className="text-muted-foreground text-lg">
            Predict the story. Win the rewards.
          </p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          <Button
            onClick={() => handleLogin('google')}
            className="w-full h-16 bg-card hover:bg-secondary border border-border rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10"
            variant="outline"
          >
            <Chrome className="mr-3 h-6 w-6" />
            <span className="text-lg">Continue with Google</span>
          </Button>

          <Button
            onClick={() => handleLogin('twitter')}
            className="w-full h-16 bg-card hover:bg-secondary border border-border rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10"
            variant="outline"
          >
            <Twitter className="mr-3 h-6 w-6" />
            <span className="text-lg">Continue with X</span>
          </Button>

          <Button
            onClick={() => handleLogin('wallet')}
            className="w-full h-16 bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/30"
          >
            <Wallet className="mr-3 h-6 w-6" />
            <span className="text-lg">Connect Wallet</span>
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            onClick={() => handleLogin('anonymous')}
            className="w-full h-12 bg-transparent hover:bg-secondary/50 border border-border/50 rounded-2xl transition-all duration-200"
            variant="ghost"
          >
            Continue as Guest
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
