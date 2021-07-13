interface TriangleProps {
  /** direction of triangle */
  sort: "asc" | "desc";
  /**
   * color of triangle
   */
  color: "red" | "yellow" | "green";
}

/** Show triangle with color and direction props */
const Triangle = ({ sort = "asc", color = "yellow" }: TriangleProps) => {
  return (
    <span
      className={`triangle triangle-${color} ml-2 ${
        sort === "desc" && "transform rotate-180"
      }`}
    ></span>
  );
};

export default Triangle;
