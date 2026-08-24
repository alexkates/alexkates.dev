export type Representation = "text/html" | "text/markdown";

type AcceptEntry = {
  type: string;
  quality: number;
  specificity: number;
  position: number;
};

const representations: Representation[] = ["text/html", "text/markdown"];

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw, position) => {
      const [mediaType, ...parameters] = raw.trim().split(";");
      const type = mediaType.trim().toLowerCase();
      let quality = 1;

      for (const parameter of parameters) {
        const [name, rawValue] = parameter.trim().split("=");
        if (name?.toLowerCase() !== "q") continue;

        const value = Number(rawValue?.trim().replace(/^"|"$/g, ""));
        if (!Number.isNaN(value)) quality = Math.max(0, Math.min(1, value));
      }

      return {
        type,
        quality,
        specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2,
        position,
      };
    })
    .filter(({ type }) => type.length > 0);
}

function matches(entry: AcceptEntry, representation: Representation) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return representation.startsWith(entry.type.slice(0, -1));
  return entry.type === representation;
}

export function negotiateRepresentation(accept: string | null): Representation | null {
  if (!accept?.trim()) return "text/html";

  const entries = parseAccept(accept);
  if (entries.length === 0) return "text/html";

  let best: { representation: Representation; quality: number; specificity: number; position: number } | undefined;

  for (const representation of representations) {
    const matchingEntry = entries
      .filter((entry) => matches(entry, representation))
      .toSorted((a, b) => b.specificity - a.specificity || a.position - b.position)[0];

    if (!matchingEntry || matchingEntry.quality === 0) continue;

    if (
      !best ||
      matchingEntry.quality > best.quality ||
      (matchingEntry.quality === best.quality && matchingEntry.specificity > best.specificity) ||
      (matchingEntry.quality === best.quality && matchingEntry.specificity === best.specificity && matchingEntry.position < best.position)
    ) {
      best = {
        representation,
        quality: matchingEntry.quality,
        specificity: matchingEntry.specificity,
        position: matchingEntry.position,
      };
    }
  }

  return best?.representation ?? null;
}
