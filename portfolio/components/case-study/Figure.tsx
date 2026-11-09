import Image from "next/image";

// Editorial figure: required alt text, optional caption.
export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tile border border-border bg-surface-raised">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 65ch, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-caption text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
