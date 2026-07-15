/**
 * One-time seed: moves the previously hardcoded site content and the images in
 * public/images into Payload. Run with:
 *
 *   bunx payload run scripts/seed.ts
 *
 * Safe to re-run: the admin user and the media uploads are only created when
 * missing, and the globals are only written while the Media collection is still
 * empty — so a re-run never overwrites content edited in the admin.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { DEFAULT_HOMEPAGE, DEFAULT_SETTINGS } from "../src/lib/defaults";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@die-schute.de";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "delubsche2026";

async function main() {
  const payload = await getPayload({ config });

  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
    payload.logger.info(`Admin user created: ${ADMIN_EMAIL}`);
  }

  const existingMedia = await payload.find({ collection: "media", limit: 1 });
  if (existingMedia.totalDocs > 0) {
    payload.logger.info("Media already exists — skipping content seed.");
    return;
  }

  // One upload per source file, even where the design reuses a photo (the hero
  // shot is also the large „Über uns“ image) — Media filenames are unique, so a
  // second upload of the same path would both duplicate the asset and collide.
  const uploaded = new Map<string, number>();

  /** Uploads a file from public/ into the Media collection, returns its id. */
  const media = async (src: string, alt: string) => {
    const cached = uploaded.get(src);
    if (cached !== undefined) return cached;
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.join(root, "public", src.replace(/^\//, "")),
    });
    uploaded.set(src, doc.id);
    return doc.id;
  };

  const h = DEFAULT_HOMEPAGE;

  const heroImage = await media(h.hero.imageSrc, h.hero.imageAlt);
  const aboutLarge = await media(h.about.imageLargeSrc, h.about.imageLargeAlt);
  const aboutSmall = await media(h.about.imageSmallSrc, h.about.imageSmallAlt);
  const people = [];
  for (const person of h.owners.people) {
    people.push({
      name: person.name,
      role: person.role,
      image: await media(person.imageSrc, person.imageAlt),
    });
  }
  const gallery = [];
  for (const image of h.gallery.images) {
    gallery.push({ image: await media(image.src, image.alt) });
  }

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      hero: {
        image: heroImage,
        reserveLabel: h.hero.reserveLabel,
        columns: h.hero.columns,
      },
      about: {
        heading: h.about.heading,
        text: h.about.text,
        quote: h.about.quote,
        quoteAuthor: h.about.quoteAuthor,
        ctaLabel: h.about.ctaLabel,
        imageLarge: aboutLarge,
        imageSmall: aboutSmall,
      },
      owners: {
        heading: h.owners.heading,
        people,
        intro: h.owners.intro,
        pullquote: h.owners.pullquote,
        paragraphs: h.owners.paragraphs,
        ctaLabel: h.owners.ctaLabel,
      },
      gallery: { images: gallery },
      contact: h.contact,
    },
  });
  payload.logger.info("Homepage seeded.");

  await payload.updateGlobal({ slug: "site-settings", data: DEFAULT_SETTINGS });
  payload.logger.info("Einstellungen seeded.");
}

await main();
process.exit(0);
