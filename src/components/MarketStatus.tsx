import { Badge } from './ui/badge';

interface MarketStatusProps {
  status: 'open' | 'closed' | 'resolved';
}

export function MarketStatus({ status }: MarketStatusProps) {
  const variants = {
    open: { label: 'Open', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    closed: { label: 'Closed', className: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    resolved: { label: 'Resolved', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  };

  const variant = variants[status];

  return (
    <Badge className={`px-4 py-1.5 rounded-full border ${variant.className}`}>
      <span className="relative flex h-2 w-2 mr-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status === 'open' ? 'bg-green-400' : ''} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'open' ? 'bg-green-500' : status === 'closed' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
      </span>
      {variant.label}
    </Badge>
  );
}
