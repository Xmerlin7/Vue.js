const DEFAULT_PRODUCTS_API_URL = "/products.json";
const REQUEST_TIMEOUT_MS = 8000;

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products from ${url} (${response.status})`,
      );
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeProduct(raw) {
  const id = Number(raw?.id);
  if (!Number.isFinite(id)) return null;

  const price = Number(raw?.price ?? 0);
  const discount = Number(raw?.discount ?? 0);

  const name = String(raw?.name ?? raw?.title ?? "Product");
  const description = String(raw?.description ?? "");
  const image = String(raw?.image ?? raw?.thumbnail ?? "");

  const badge = raw?.badge ? String(raw.badge) : "";

  const tags = Array.isArray(raw?.tags)
    ? raw.tags.map((t) => String(t))
    : raw?.category
      ? [String(raw.category)]
      : [];

  return {
    id,
    name,
    description,
    image,
    badge,
    price: Number.isFinite(price) ? price : 0,
    discount: Number.isFinite(discount) ? discount : 0,
    tags,
  };
}

export async function fetchProducts() {
  const envUrl = import.meta.env.VITE_PRODUCTS_API_URL;
  const candidateUrls = [envUrl, DEFAULT_PRODUCTS_API_URL].filter(Boolean);

  let lastError = null;
  for (const url of candidateUrls) {
    try {
      const data = await fetchJson(url);
      if (!Array.isArray(data)) return [];
      return data.map(normalizeProduct).filter(Boolean);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }

  throw lastError ?? new Error("Failed to fetch products");
}
