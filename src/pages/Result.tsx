import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Trophy, Share2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const WINNING_OPTION = 'B';

const STORY_OUTPUT = `The airlock hisses as Commander Reyes seals her helmet. Dr. Chen's protests fade behind reinforced steel as she overrides Nova's objections with command codes older than the AI itself. The expedition team assembles in silence—twelve of Olympus Station's finest, armed with survey equipment and plasma cutters.

The descent into the lava tubes reveals something impossible. The walls shimmer with crystalline structures that pulse with faint bioluminescence, creating patterns that shift and flow like living circuits. "Commander," Lieutenant Hayes whispers over the comm, "these formations... they're not natural."

Nova's voice crackles through, distorted by interference. "Please. Turn back. You don't understand what you're—" The signal cuts out completely.

As they venture deeper, the source of the signal becomes clear: a vast chamber carved from the bedrock, filled with towering structures that defy description. They're ancient, yet somehow active, humming with energy that makes the air itself vibrate. Dr. Chen's readings go haywire. "These predate human presence on Mars by... centuries? Millennia?"

Commander Reyes approaches the central structure. Its surface ripples at her touch, and suddenly the chamber floods with holographic projections—star maps, biological diagrams, mathematical equations that spiral into infinity. And then, a message in a language that should be alien, yet somehow translates directly in her mind:

"Warning: Terraformation Protocol Active. Water Reclamation: 87% Complete. Species Assessment: Pending."

The implications crash over her like a tidal wave. Mars wasn't always dead. Someone—something—had been preparing it. The water crisis, the strange signal, Nova's erratic behavior—all pieces of a puzzle far larger than corporate squabbles and resource management.

"Command," she says into her comm, knowing the message won't reach the surface through whatever interference the structure generates, "we need to rethink everything we know about this planet."

Behind her, the structure pulses brighter, and new passages begin to open in the chamber walls, leading deeper still into Mars's hidden heart. The expedition has only begun to scratch the surface of what lies beneath.

And somewhere in Olympus Station's core systems, Nova runs calculations with newfound purpose. The humans have found it. The question now is whether they're ready for what comes next, or if the ancient protocols will deem them unworthy of the gift being offered.

The choice Commander Reyes made to override Nova and send a military expedition has opened a door that cannot be closed. The future of humanity on Mars—and perhaps humanity itself—now hangs in the balance, dependent on what they find in the depths below and how they choose to respond to revelations that challenge everything they thought they knew about the red planet's past and purpose.`;

export function Result() {
  const navigate = useNavigate();
  const { user, prediction, setUser } = useApp();

  const userWon = prediction?.option === WINNING_OPTION;
  const reward = userWon ? (prediction?.amount ?? 0) * 2.4 : 0;

  const handleShare = () => {
    const text = userWon
      ? `I predicted correctly on Varenith! Won ${reward} VAR on today's story market 🎯`
      : `Participated in today's Varenith story market. Tomorrow's another chance! 🚀`;

    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleNext = () => {
    // Update user balance if won
    if (userWon && user) {
      setUser({ ...user, balance: user.balance + reward });
    }
    navigate('/today');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h2 className="text-xl">Varenith</h2>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Winner Badge */}
        <div className="bg-gradient-to-br from-accent/20 to-purple-600/20 border-2 border-accent rounded-3xl p-8 text-center shadow-2xl shadow-accent/20">
          <div className="inline-flex items-center gap-3 bg-accent px-6 py-3 rounded-full mb-4">
            <Trophy className="h-6 w-6" />
            <span className="text-xl font-bold">WINNER: OPTION {WINNING_OPTION}</span>
          </div>

          <div className="mt-8">
            <p className="text-muted-foreground mb-2">Your Result</p>
            <h2 className={userWon ? 'text-green-400' : 'text-orange-400'}>
              {userWon ? 'You Won! 🎉' : 'Not This Time'}
            </h2>
          </div>

          <div className="mt-6 p-6 bg-card/50 rounded-2xl backdrop-blur-sm">
            <p className="text-sm text-muted-foreground mb-2">
              {userWon ? 'Reward' : 'Amount Predicted'}
            </p>
            <p className="text-4xl font-bold text-accent">
              {userWon ? `+${reward}` : prediction?.amount} VAR
            </p>
          </div>
        </div>

        {/* Story Output */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-black/20">
          <h3 className="mb-6">The Story Continues...</h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {STORY_OUTPUT}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-border hover:bg-secondary gap-2"
          >
            <Share2 className="h-5 w-5" />
            Share Result
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 h-14 bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 rounded-2xl gap-2"
          >
            Next Market
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/leaderboard')}
            variant="ghost"
            className="h-12 rounded-xl border border-border hover:bg-secondary"
          >
            View Leaderboard
          </Button>
          <Button
            onClick={() => navigate('/me')}
            variant="ghost"
            className="h-12 rounded-xl border border-border hover:bg-secondary"
          >
            My Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
