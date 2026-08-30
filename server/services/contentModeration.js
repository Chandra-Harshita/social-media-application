import dotenv from "dotenv";

dotenv.config();

const BLOCK_THRESHOLD = 2;

const BLOCKED_CLASSES = [
  "spam",
  "promotions",
  "bullying",
  "hate",
  "sexual",
  "sexual_description",
  "violence",
  "violent_description",
  "drugs",
  "weapons",
  "self_harm",
  "self_harm_intent",
  "child_exploitation",
  "child_safety",
];

export const moderatePost = async (text) => {
  if (!text || !text.trim()) {
    return {
      blocked: false,
      reason: null,
      message: null,
    };
  }


  const response = await fetch(
    "https://api.thehive.ai/api/v3/hive/text-moderation",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.HIVE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: [
          {
            text: text,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Hive API error: ${JSON.stringify(data)}`
    );
  }

  const output = data.output?.[0];

  const classes = output?.classes || [];
  const stringMatches = output?.string_matches || [];

  // Convert classes into an object
  const scores = {};

  for (const item of classes) {
    scores[item.class] = item.value;
  }

  /*
   * 1. Check profanity
   */
  const profanityMatches = stringMatches.filter(
    (match) => match.type === "profanity"
  );

  if (profanityMatches.length > 0) {
    return {
      blocked: true,
      reason: "PROFANITY",
      message:
        "This post contains inappropriate or offensive language.",
      matches: profanityMatches.map(
        (match) => match.value
      ),
      scores,
    };
  }

  /*
   * 2. Check moderation categories
   */
  const blockedCategory = BLOCKED_CLASSES.find(
    (category) =>
      (scores[category] || 0) >= BLOCK_THRESHOLD
  );

  if (blockedCategory) {
    return {
      blocked: true,
      reason: blockedCategory,
      message: getMessage(blockedCategory),
      scores,
    };
  }

  /*
   * 3. Post is clean
   */
  return {
    blocked: false,
    reason: null,
    message: null,
    scores,
  };
};

const getMessage = (category) => {
  switch (category) {
    case "spam":
      return "This post was detected as spam.";

    case "promotions":
      return "Promotional or advertising content is not allowed.";

    case "bullying":
      return "This post contains bullying or abusive content.";

    case "hate":
      return "This post contains hateful content.";

    case "sexual":
    case "sexual_description":
      return "This post contains inappropriate sexual content.";

    case "violence":
    case "violent_description":
      return "This post contains violent content.";

    case "drugs":
      return "This post contains drug-related content.";

    case "weapons":
      return "This post contains inappropriate weapon-related content.";

    case "self_harm":
    case "self_harm_intent":
      return "This post contains potentially harmful content.";

    case "child_exploitation":
    case "child_safety":
      return "This post contains content that violates our safety guidelines.";

    default:
      return "This post contains inappropriate content.";
  }
};