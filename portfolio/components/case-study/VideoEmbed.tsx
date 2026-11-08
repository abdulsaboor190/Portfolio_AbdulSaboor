"use client";

import { useState } from "react";

// Two modes:
//  - provider="file" (default): local clip in /public — muted, playsInline,
//    controls, preload="none" so nothing loads until the user hits play.
//    Never autoplays (reduced-motion safe).
//  - provider="youtube" | "loom": click-to-load facade — a labelled button
//    stands in for the iframe until activated, so embeds cost nothing
//    upfront and respect reduced motion / privacy.

type Props = {
  src: string;
  provider?: "file" | "youtube" | "loom";
  poster?: string;
  loop?: boolean;
  caption?: string;
};

function toEmbedUrl(src: string, provider: "youtube" | "loom"): string {
  if (provider === "youtube") {
    const id =
      src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/)?.[1] ??
      src.match(/youtube\.com\/embed\/([\w-]{6,})/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : src;
  }
  // loom.com/share/{id} → loom.com/embed/{id}
  return src.replace("loom.com/share/", "loom.com/embed/");
}

export function VideoEmbed({ src, provider = "file", poster, loop, caption }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (provider !== "file") {
    const embed = toEmbedUrl(src, provider);
    return (
      <figure className="my-8">
        <div className="overflow-hidden rounded-tile border border-border bg-black">
          {loaded ? (
            <iframe
              src={embed}
              title={caption ?? "Video"}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-surface-raised text-body text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]"
            >
              <span className="text-h3" aria-hidden="true">
                ▶
              </span>
              Load video
            </button>
          )}
        </div>
        {caption ? (
          <figcaption className="mt-2 text-caption text-muted">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <video
        src={src}
        poster={poster}
        controls
        muted
        playsInline
        loop={loop}
        preload="none"
        className="w-full rounded-tile border border-border bg-black"
      />
      {caption ? (
        <figcaption className="mt-2 text-caption text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
