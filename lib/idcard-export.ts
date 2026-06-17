"use client";

import { toPng } from "html-to-image";

export async function exportIdCard(node: HTMLElement, filename: string) {
  // wait for fonts so html-to-image renders with the right glyphs
  if ("fonts" in document) {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#0A0A12",
    skipFonts: false,
  });

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${filename}.png`;
  link.click();
}
