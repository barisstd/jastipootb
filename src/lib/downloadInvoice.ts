import { toPng } from "html-to-image";

const PIXEL_RATIO = 2; // sharper image on high-DPI screens and when zoomed

/** Renders a DOM node to a PNG and triggers a browser download. */
export async function downloadElementAsPng(node: HTMLElement, filename: string): Promise<void> {
  // Make sure web fonts are loaded so the image doesn't fall back to a default font.
  if (document.fonts?.ready) await document.fonts.ready;

  const options = { pixelRatio: PIXEL_RATIO, cacheBust: true };
  let dataUrl: string;
  try {
    // First call warms up font/image loading; Safari/iOS can return a
    // blank image on the very first render otherwise.
    await toPng(node, options);
    dataUrl = await toPng(node, options);
  } catch {
    // If embedding the web fonts fails, still produce an image with fallback fonts.
    dataUrl = await toPng(node, { ...options, skipFonts: true });
  }

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
