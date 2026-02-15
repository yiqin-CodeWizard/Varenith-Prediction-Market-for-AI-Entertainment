import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const HOW_IT_WORKS = [
  {
    step: '①',
    title: 'Read the Story',
    description: 'A new chapter appears each day, ending at a critical decision.',
  },
  {
    step: '②',
    title: 'Make Your Prediction',
    description: 'Choose the outcome you believe will happen next. Once chosen, your position is locked.',
  },
  {
    step: '③',
    title: 'See the Outcome',
    description: 'When the clock ends, the story continues and one result becomes real.',
  },
  {
    step: '④',
    title: 'Return Tomorrow',
    description: 'Every ending creates a new dilemma. Come back and decide again.',
  },
];

const IMPORTANT_NOTES = [
  'There are no perfect choices.',
  'Being early matters.',
  'Debate is part of the experience.',
  'Tomorrow always brings a new decision.',
];

const QUICK_RULES = [
  'One prediction per market.',
  'Results are final once revealed.',
  'Discussion is encouraged.',
  'AI prompts and models are given.',
];

export function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen px-6 py-8 md:py-10">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
        <section className="pt-4 md:pt-8 lg:pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">Welcome to Varenith</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-muted-foreground/80 leading-relaxed">
            Stories are no longer just watched. Here, you decide what happens next.
          </p>
        </section>

        <section className="mt-8 md:mt-10">
          <h2 className="text-xl md:text-2xl mb-4">How It Works</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <article
                key={item.step}
                className="rounded-xl border border-border bg-card px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-sm text-muted-foreground mb-2">{item.step}</p>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <h2 className="text-lg md:text-xl mb-3">Important Things to Know</h2>
          <ul className="max-w-3xl space-y-2 text-sm md:text-base text-muted-foreground/80">
            {IMPORTANT_NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 md:mt-10">
          <h2 className="text-lg md:text-xl mb-3">Quick Rules</h2>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground/85">
            {QUICK_RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sticky bottom-0 mt-8 bg-background/90 backdrop-blur-sm py-4 md:static md:bg-transparent md:backdrop-blur-none md:py-0 md:mt-10">
          <Button
            onClick={() => navigate('/login')}
            className="h-14 w-full rounded-xl text-base md:text-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Enter Today&apos;s Story →
          </Button>
        </section>
      </div>
    </main>
  );
}
