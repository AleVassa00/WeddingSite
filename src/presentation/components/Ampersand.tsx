interface AmpersandProps {
  readonly className?: string;
}

export function Ampersand({ className }: AmpersandProps) {
  const classes = className ? `ampersand ${className}` : "ampersand";

  return <span className={classes}>&amp;</span>;
}
