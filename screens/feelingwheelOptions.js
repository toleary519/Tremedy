export const feelingWheel = [
  {
    Anger: {
      Rage: ["Hostile", "Hate"],
      Exasperated: ["Frustrated", "Agitated"],
      Irratable: ["Aggravated", "Annoyed"],
      Envy: ["Jealous", "Resentful"],
      Disgust: ["Revolted", "Contempt"],
    },
    Fear: {
      Horror: ["Mortified", "Dread"],
      Nervous: ["Worried", "Anxious"],
      Insecure: ["Inferior", "Inadequate"],
      Terror: ["Panic", "Hysterical"],
      Scared: ["Frightend", "Helpless"],
    },
    Love: {
      Peaceful: ["Satisfied", "Relieved"],
      Tenderness: ["Compassionate", "Caring"],
      Desire: ["Passion", "Infatuation"],
      Longing: ["Sentimental", "Attracted"],
      Affectionate: ["Romantic", "Fondness"],
    },
    Joy: {
      Enthralled: ["Enchanted", "Rapture"],
      Elation: ["Euphoric", "Jubilation"],
      Enthusiastic: ["Zeal", "Excited"],
      Optimistic: ["Eager", "Hopeful"],
      Proud: ["Triumphant", "Illustrious"],
      Cheerful: ["Blissful", "Jovial"],
      Happy: ["Amused", "Delighted"],
      Content: ["Satisfied", "Pleased"],
    },
    Surprise: {
      Stunned: ["Shocked", "Dismayed"],
      Confused: ["Perplexed", "Disillusioned"],
      Amazed: ["Shocked", "Dismayed"],
      Overcome: ["Grief", "Powerless"],
      Moved: ["Stimulated", "Touched"],
    },
    Sadness: {
      Despair: { 1: "Grief", 2: "Powerless" },
      Neglected: { 1: "Isolated", 2: "Lonely" },
      Shameful: { 1: "Regretful", 2: "Guilty" },
      Disappointed: { 1: "Dismayed", 2: "Displeased" },
      Suffering: { 1: "Depressed", 2: "Sorrow" },
      Pained: { 1: "Agony", 2: "Hurt" },
    },
  },
];

export const handleFace = (face) => {
  if (face === 1) {
    return "😔";
  }
  if (face === 2) {
    return "😞";
  }
  if (face === 3) {
    return "🙁";
  }
  if (face === 4) {
    return "😐";
  }
  if (face === 5) {
    return "🙂";
  }
  if (face === 6) {
    return "😀";
  }
  if (face === 7) {
    return "😁";
  }
};