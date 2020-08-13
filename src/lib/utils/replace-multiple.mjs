export default (string, ...regexAndReplacements) =>
  regexAndReplacements.reduce(
    (soFar, [regex, replacement]) => soFar.replace(regex, replacement),
    string
  )
