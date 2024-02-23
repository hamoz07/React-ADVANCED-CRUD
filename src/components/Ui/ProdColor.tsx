interface IProdColorProps {
  color: string;
  onClick?: () => void;
}

const ProdColor = ({ color , onClick }: IProdColorProps) => {
  return (
    <span
      className="w-5 h-5 rounded-full border-1
      border-gray-200 cursor-pointer"
      style={{ background: color }}
      onClick={onClick}
    />
  );
};

export default ProdColor;
