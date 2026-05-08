import { cn } from "@/lib/utils";

interface Props {
  emoji?: string;
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}

const OptionCard = ({ emoji, label, sublabel, selected, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "group flex min-h-[72px] w-full items-center gap-4 rounded-xl border-2 bg-bg-2 px-5 py-4 text-left transition-all duration-200",
      "hover:border-lime/60 hover:bg-bg-2/80",
      selected
        ? "scale-[1.02] border-lime bg-lime/10"
        : "border-border-2",
    )}
  >
    {emoji && <span className="text-2xl">{emoji}</span>}
    <div className="flex-1">
      <div className="font-display text-xl uppercase leading-tight tracking-wide text-foreground">
        {label}
      </div>
      {sublabel && (
        <div className="mt-0.5 font-body text-sm text-muted">{sublabel}</div>
      )}
    </div>
    <div
      className={cn(
        "h-5 w-5 flex-shrink-0 rounded-full border-2 transition-all",
        selected ? "border-lime bg-lime" : "border-muted-2",
      )}
    />
  </button>
);

export default OptionCard;
