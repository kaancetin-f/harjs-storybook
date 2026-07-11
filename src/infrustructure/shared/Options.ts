const Options = {
  Variant: ["filled", "surface-borderless", "outlined", "dashed"],
  Color: ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray"],
  Radius: ["0", "2", "4", "6", "8", "12", "16", "20", "40", "full"],
  Size: ["xs", "sm", "md", "lg", "xl", "2xl"],
} as const;

export default Options;
