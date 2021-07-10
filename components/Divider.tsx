interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={className}
      style={{ height: "1px", backgroundColor: "#49515c" }}
    />
  );
};

export default Divider;
