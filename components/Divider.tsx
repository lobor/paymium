interface DividerProps {
  /** className to apply on divider */
  className?: string;
}

/** Divider component, is line of 1 px of height with background-color */
const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={className}
      style={{ height: "1px", backgroundColor: "#49515c" }}
    />
  );
};

export default Divider;
