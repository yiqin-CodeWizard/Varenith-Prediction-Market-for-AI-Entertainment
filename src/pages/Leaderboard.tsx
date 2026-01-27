import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Trophy, Medal, Flame } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  wins: number;
  streak: number;
  isMe?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'CryptoWizard', wins: 45, streak: 8 },
  { rank: 2, username: 'MarsPredictor', wins: 42, streak: 5 },
  { rank: 3, username: 'StoryMaster', wins: 38, streak: 12 },
  { rank: 4, username: 'TokenKing', wins: 35, streak: 3 },
  { rank: 5, username: 'AIProphet', wins: 33, streak: 6 },
  { rank: 6, username: 'NovaSeer', wins: 31, streak: 4 },
  { rank: 7, username: 'OlympusTrader', wins: 28, streak: 7 },
  { rank: 8, username: 'RedPlanetRich', wins: 26, streak: 2 },
  { rank: 9, username: 'SignalSeeker', wins: 24, streak: 5 },
  { rank: 10, username: 'DustStormDan', wins: 23, streak: 3 },
  { rank: 11, username: 'Guest123', wins: 12, streak: 3, isMe: true },
  { rank: 12, username: 'QuantumQueen', wins: 21, streak: 4 },
  { rank: 13, username: 'TerraFormer', wins: 20, streak: 6 },
  { rank: 14, username: 'VoidWalker', wins: 19, streak: 2 },
  { rank: 15, username: 'StarGazer', wins: 18, streak: 8 },
  { rank: 16, username: 'BetaBuster', wins: 17, streak: 1 },
  { rank: 17, username: 'AlphaAce', wins: 16, streak: 5 },
  { rank: 18, username: 'GammaGuru', wins: 15, streak: 3 },
  { rank: 19, username: 'DeltaDreamer', wins: 14, streak: 4 },
  { rank: 20, username: 'EpsilonExplorer', wins: 13, streak: 2 },
];

export function Leaderboard() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [filter, setFilter] = useState<'daily' | 'season'>('season');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-300" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return null;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            onClick={() => navigate('/today')}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl">Leaderboard</h2>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Filter Toggles */}
        <div className="flex gap-2 p-1 bg-card border border-border rounded-2xl">
          <Button
            onClick={() => setFilter('daily')}
            variant={filter === 'daily' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl ${
              filter === 'daily' ? 'bg-accent hover:bg-accent/90' : ''
            }`}
          >
            Daily
          </Button>
          <Button
            onClick={() => setFilter('season')}
            variant={filter === 'season' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl ${
              filter === 'season' ? 'bg-accent hover:bg-accent/90' : ''
            }`}
          >
            Season
          </Button>
        </div>

        {/* Leaderboard List */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-6 bg-secondary border-b border-border text-sm text-muted-foreground">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3 text-center">Wins</div>
            <div className="col-span-3 text-center">Streak</div>
          </div>

          {/* Entries */}
          <div className="divide-y divide-border">
            {MOCK_LEADERBOARD.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-12 gap-4 p-6 transition-colors ${
                  entry.isMe
                    ? 'bg-accent/10 border-l-4 border-l-accent'
                    : 'hover:bg-secondary/50'
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankIcon(entry.rank) || (
                    <span className="text-muted-foreground font-semibold">{entry.rank}</span>
                  )}
                </div>
                <div className="col-span-5 flex items-center">
                  <span className={entry.isMe ? 'font-bold text-accent' : ''}>
                    {entry.username}
                  </span>
                  {entry.isMe && (
                    <span className="ml-2 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <span className="font-semibold">{entry.wins}</span>
                </div>
                <div className="col-span-3 flex items-center justify-center gap-2">
                  {entry.streak >= 5 && <Flame className="h-4 w-4 text-orange-500" />}
                  <span className="font-semibold">{entry.streak}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Your Rank</p>
            <p className="text-3xl font-bold">#{user?.wins ? 11 : '--'}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Total Wins</p>
            <p className="text-3xl font-bold">{user?.wins ?? 0}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Streak</p>
            <div className="flex items-center justify-center gap-2">
              {(user?.streak ?? 0) >= 3 && <Flame className="h-6 w-6 text-orange-500" />}
              <p className="text-3xl font-bold">{user?.streak ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}