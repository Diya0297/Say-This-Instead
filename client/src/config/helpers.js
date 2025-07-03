export function extractArrayFromResponse(text) {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1) {
    throw new Error("No array found in the response");
  }
  const arrayStr = text.substring(start, end + 1);
  return JSON.parse(arrayStr);
}



export function extractFeedback(rawFeedback) {
  if (typeof rawFeedback !== "string") {
    console.error("Expected feedback to be a string, got:", rawFeedback);
    return "";
  }

  const thinkEndIndex = rawFeedback.indexOf('</think>');
  if (thinkEndIndex !== -1) {
    // Return everything AFTER </think>
    return rawFeedback.substring(thinkEndIndex + 8).trim();
  }

  // If no </think> found, return full string
  return rawFeedback.trim();
}