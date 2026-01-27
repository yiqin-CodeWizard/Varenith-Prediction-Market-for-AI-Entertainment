import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, User, Coins, TrendingUp, TrendingDown, LogOut } from 'lucide-react';

interface HistoryItem {
  id: string;
  date: string;
  market: string;
  option: string;
  result: 'win' | 'loss';
  amount: number;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    date: 'Jan 27',
    market: 'The Signal Below',
    option: 'B',
    result: 'win',
    amount: 120,
  },
  {
    id: '2',
    date: 'Jan 26',
    market: 'Corporate Tensions',
    option: 'A',
    result: 'win',
    amount: 85,
  },
  {
    id: '3',
    date: 'Jan 25',
    market: 'Water Crisis Decision',
    option: 'C',
    result: 'loss',
    amount: -50,
  },
  {
    id: '4',
    date: 'Jan 24',
    market: 'Nova\'s Secret',
    option: 'D',
    result: 'loss',
    amount: -30,
  },
  {
    id: '5',
    date: 'Jan 23',
    market: 'Dust Storm Protocol',
    option: 'A',
    result: 'win',
    amount: 95,
  },
  {
    id: '6',
    date: 'Jan 22',
    market: 'Alliance or War',
    option: 'B',
    result: 'win',
    amount: 110,
  },
  {
    id: '7',
    date: 'Jan 21',
    market: 'The First Contact',
    option: 'A',
    result: 'loss',
    amount: -75,
  },
];

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const winRate = Math.round((user.wins / (user.wins + user.losses)) * 100);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/today')}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl">Profile</h2>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-card to-secondary border border-border rounded-3xl p-8 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
              <User className="h-10 w-10" />
            </div>
            <div>
              <h2>{user.username}</h2>
              <p className="text-muted-foreground">Member since Jan 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                <p className="text-sm text-muted-foreground">Balance</p>
              </div>
              <p className="text-2xl font-bold">{user.balance}</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Win Rate</p>
              <p className="text-2xl font-bold text-green-400">{winRate}%</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Streak</p>
              <p className="text-2xl font-bold text-orange-400">{user.streak}</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Rank</p>
              <p className="text-2xl font-bold">#11</p>
            </div>
          </div>
        </div>

        {/* Stats Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4>Total Wins</h4>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{user.wins}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4>Total Losses</h4>
              <TrendingDown className="h-5 w-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{user.losses}</p>
          </div>
        </div>

        {/* History */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
          <div className="p-6 border-b border-border">
            <h3>Recent History</h3>
          </div>

          <div className="divide-y divide-border">
            {MOCK_HISTORY.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{item.market}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.date} · Option {item.option}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        item.result === 'win'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {item.result === 'win' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {item.amount > 0 ? '+' : ''}
                      {item.amount} VAR
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/today')}
            className="h-14 bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 rounded-2xl"
          >
            Today's Market
          </Button>
          <Button
            onClick={() => navigate('/leaderboard')}
            variant="outline"
            className="h-14 rounded-2xl border-border hover:bg-secondary"
          >
            Leaderboard
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}