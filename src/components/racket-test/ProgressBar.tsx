interface Props {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => {
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <p className="mb-2 font-body text-xs uppercase tracking-widest text-muted">
        Vraag {current} van {total}
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-2">
        <div
          className="h-full bg-lime transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
