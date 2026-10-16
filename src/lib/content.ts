import { getImage } from "astro:assets";
import { getCollection } from "astro:content";

export async function getSortedArticles() {
  const articles = await getCollection("articles");
  return articles.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getSortedGroups() {
  const groups = await getCollection("groups");
  return groups.sort((a, b) => a.data.order - b.data.order);
}

export async function getSortedTeam() {
  const team = await getCollection("team");
  return team.sort((a, b) => a.data.order - b.data.order);
}

export async function getCauseAreasWithCharities() {
  const causeAreas = await getCollection("causeAreas");
  const charities = await getCollection("charities");
  return causeAreas
    .sort((a, b) => a.data.order - b.data.order)
    .map((causeArea) => ({
      ...causeArea,
      charities: charities
        .filter((charity) => charity.data.causeArea.id === causeArea.id)
        .sort((a, b) => a.data.order - b.data.order),
    }));
}

// Social preview image, resized and in a format all platforms support
export async function getOgImageUrl(image: ImageMetadata, site: URL) {
  const ogImage = await getImage({
    src: image,
    width: Math.min(image.width, 1200),
    format: image.format === "jpg" || image.format === "jpeg" ? "jpg" : "png",
  });
  return new URL(ogImage.src, site).toString();
}
