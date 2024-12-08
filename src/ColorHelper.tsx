export const getReadableTextColor = (bgRgb: number[]): string => {
    const [r, g, b] = bgRgb.map((c) => c / 255);
  
    const corrected = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  
    const luminance =
      0.2126 * corrected(r) + 0.7152 * corrected(g) + 0.0722 * corrected(b);
  
    const whiteLuminance = 1;
    const blackLuminance = 0;
  
    const contrastWithWhite = (whiteLuminance + 0.05) / (luminance + 0.05);
    const contrastWithBlack = (luminance + 0.05) / (blackLuminance + 0.05);
  
    return contrastWithWhite > contrastWithBlack ? "white" : "black";
  };
  