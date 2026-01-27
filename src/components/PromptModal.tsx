import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PromptModalProps {
  open: boolean;
  onClose: () => void;
}

export function PromptModal({ open, onClose }: PromptModalProps) {
  const [openSections, setOpenSections] = useState<string[]>(['world']);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI Prompt Configuration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Collapsible open={openSections.includes('world')}>
            <CollapsibleTrigger
              onClick={() => toggleSection('world')}
              className="flex items-center justify-between w-full p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <span className="font-semibold">World Background</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSections.includes('world') ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pt-4 text-muted-foreground">
              <p>
                In the year 2157, humanity has colonized Mars. The red planet is now home to
                thriving cities under massive domes, each governed by powerful corporations
                competing for resources and influence. Tensions are rising as water reserves
                dwindle and a mysterious signal from the outer rim threatens the fragile peace.
              </p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.includes('characters')}>
            <CollapsibleTrigger
              onClick={() => toggleSection('characters')}
              className="flex items-center justify-between w-full p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <span className="font-semibold">Characters</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSections.includes('characters') ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pt-4 text-muted-foreground space-y-3">
              <div>
                <p className="font-medium text-foreground">Commander Elena Reyes</p>
                <p>Former military officer turned corporate security chief. Pragmatic and loyal.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Dr. Marcus Chen</p>
                <p>Brilliant xenobiologist investigating the mysterious signal.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Nova</p>
                <p>An AI assistant with questionable allegiances.</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.includes('rules')}>
            <CollapsibleTrigger
              onClick={() => toggleSection('rules')}
              className="flex items-center justify-between w-full p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <span className="font-semibold">Writing Rules</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSections.includes('rules') ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pt-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>Write in present tense</li>
                <li>Focus on action and dialogue</li>
                <li>Build tension through pacing</li>
                <li>Keep description concise and vivid</li>
                <li>End with a clear decision point</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.includes('format')}>
            <CollapsibleTrigger
              onClick={() => toggleSection('format')}
              className="flex items-center justify-between w-full p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <span className="font-semibold">Output Format</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSections.includes('format') ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pt-4 text-muted-foreground">
              <p className="mb-2">The AI will generate:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Story text (800-1000 words)</li>
                <li>Followed by a line: WIN_OPTION: A|B|C|D</li>
              </ol>
              <p className="mt-4 text-sm bg-accent/10 p-3 rounded-lg border border-accent/20">
                Model using: GPT-5.2
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  );
}
