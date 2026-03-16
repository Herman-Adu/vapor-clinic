export const easings = {
  entrance: "power3.out",
  morph: "power2.inOut",
  // CSS cubic-bezier(0.25, 0.46, 0.45, 0.94) mapped roughly to GSAP's CustomEase if needed, 
  // but for simple staggers we can use Power/Expo, and for CSS transitions use this string.
  magneticCSS: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

export const staggers = {
  text: 0.08,
  card: 0.15,
};
