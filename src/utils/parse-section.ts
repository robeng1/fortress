export const parseSection = (content?: string): Record<string, any> => {
  if (!content) {
    return {}
  }
  const splits = content.split("{% schema %}")
  const raw = splits.length > 1 ? splits[1].replace("{% endschema %}", "") : ""
  return JSON.parse(raw)
}
