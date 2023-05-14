const Divider: React.FC<{}> = (props) => {
  return (
    <hr
      className="h-[1px] border-t-0 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(90deg,transparent,rgba(0,0,0,.4),transparent)",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Divider;
