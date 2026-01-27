import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { MarketStatus } from '../components/MarketStatus';
import { CountdownTimer } from '../components/CountdownTimer';
import { PromptModal } from '../components/PromptModal';
import { BottomNav } from '../components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Progress } from '../components/ui/progress';
import { Info, User, TrendingUp, Coins } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const MARKET_CLOSE = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours from now

const STORY_CONTEXT = `Commander Reyes stands at the observation deck of Olympus Station, watching dust storms rage across the Martian surface. Dr. Chen bursts in with urgent news: the mysterious signal isn't from space—it's coming from beneath the surface, deep in the ancient lava tubes. Nova, the station's AI, has been acting strangely, restricting access to certain systems. With water supplies running low and tensions between corporations reaching a breaking point, Reyes must decide how to proceed.`;

const OPTIONS = [
  { id: 'A', label: 'Trust Nova and investigate the signal together', pool: 35 },
  { id: 'B', label: 'Override Nova and send a military expedition', pool: 40 },
  { id: 'C', label: 'Negotiate with rival corporations for joint exploration', pool: 15 },
  { id: 'D', label: 'Seal the lava tubes and focus on the water crisis', pool: 10 },
];

export function TodayMarket() {
  const navigate = useNavigate();
  const { user, prediction, setPrediction } = useApp();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(10);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const marketStatus: 'open' | 'closed' | 'resolved' = 'open';

  const handlePredict = () => {
    if (!selectedOption) return;
    setShowConfirm(true);
  };

  const confirmPrediction = () => {
    if (!selectedOption || !user) return;

    setPrediction({
      option: selectedOption,
      amount,
      marketId: 'market-001',
    });

    setShowConfirm(false);
    toast.success(`Predicted Option ${selectedOption} with ${amount} VAR`);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">Varenith</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{user?.balance} VAR</span>
            </div>
            <Button
              onClick={() => navigate('/me')}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Market Header */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="mb-2">The Signal Below</h1>
              <p className="text-muted-foreground">Daily Story Market #47</p>
            </div>
            <MarketStatus status={marketStatus} />
          </div>

          <div className="flex items-center justify-between p-6 bg-secondary rounded-2xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Closes In</p>
              <CountdownTimer targetDate={MARKET_CLOSE} />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Total Pool</p>
              <p className="text-2xl font-bold">2,450 VAR</p>
            </div>
          </div>
        </div>

        {/* Story Context */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between mb-4">
            <h3>Story Context</h3>
            <Button
              onClick={() => setShowPrompt(true)}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Info className="h-4 w-4" />
              View Prompt
            </Button>
          </div>
          <p className="text-muted-foreground leading-relaxed">{STORY_CONTEXT}</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <h3>What Happens Next?</h3>
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                selectedOption === option.id
                  ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                  : 'border-border bg-card hover:border-accent/50 hover:bg-accent/5'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                      selectedOption === option.id
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {option.id}
                  </div>
                  <p className="text-lg">{option.label}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pool Distribution</span>
                  <span className="font-semibold">{option.pool}%</span>
                </div>
                <Progress value={option.pool} className="h-2" />
              </div>
            </button>
          ))}
        </div>

        {/* Predict Panel */}
        <div className="bg-gradient-to-br from-card to-secondary border border-border rounded-3xl p-8 shadow-2xl shadow-black/20">
          <h3 className="mb-6">Make Your Prediction</h3>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-3 block">Select Amount</label>
            <div className="flex gap-3">
              {[10, 50, 100, 200].map((preset) => (
                <Button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  variant={amount === preset ? 'default' : 'outline'}
                  className={`flex-1 h-14 rounded-xl ${
                    amount === preset
                      ? 'bg-accent hover:bg-accent/90'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {preset} VAR
                </Button>
              ))}
            </div>
          </div>

          {/* Predict Button */}
          <Button
            onClick={handlePredict}
            disabled={!selectedOption || marketStatus !== 'open' || !!prediction}
            className="w-full h-16 bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 rounded-2xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {prediction ? 'Prediction Placed' : 'Predict Now'}
          </Button>
        </div>

        {/* My Position */}
        {prediction && (
          <div className="bg-card border-2 border-accent rounded-3xl p-8 shadow-2xl shadow-accent/10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h3>Your Position</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Predicted Option</p>
                <p className="text-3xl font-bold">Option {prediction.option}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="text-3xl font-bold">{prediction.amount} VAR</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/result')}
              variant="outline"
              className="w-full h-12 rounded-xl border-accent/50 hover:bg-accent/10 mt-6"
            >
              View Demo Result
            </Button>
          </div>
        )}
      </div>

      {/* Prompt Modal */}
      <PromptModal open={showPrompt} onClose={() => setShowPrompt(false)} />

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Confirm Prediction</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <p className="text-center text-lg mb-4">
              Predict <span className="font-bold text-accent">Option {selectedOption}</span> with{' '}
              <span className="font-bold text-accent">{amount} VAR</span>?
            </p>
            <p className="text-center text-sm text-muted-foreground">
              This action cannot be undone
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button onClick={() => setShowConfirm(false)} variant="outline" className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={confirmPrediction} className="bg-accent hover:bg-accent/90 rounded-xl">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}