import { sanityClient } from "sanity:client";
import type {
  Article,
  CauseArea,
  Charity,
  LocalGroup,
  Page,
  TeamMember,
} from "./sanity.types";

type ReturnTypes = {
  charity: Charity;
  localGroup: LocalGroup;
  article: Article;
  causeArea: CauseArea;
  teamMember: TeamMember;
  page: Page;
};

export async function fetchOne<T extends keyof ReturnTypes>(
  type: T,
  astroParams: any,
): Promise<ReturnTypes[T]> {
  const query = `*[_type == "${type}" && slug.current == $slug][0]`;
  return await sanityClient.fetch<ReturnTypes[T]>(query, astroParams);
}

export async function getStaticPathsForType(
  type: keyof ReturnTypes,
  astroParams: any,
): Promise<{ params: { slug: string } }[]> {
  const SLUGS_QUERY = `*[_type == "${type}" && defined(slug.current)]{
    "params": {"slug": slug.current}
  }`;
  return await sanityClient.fetch(SLUGS_QUERY, astroParams);
}

export async function fetchAll<T extends keyof ReturnTypes>(
  type: T,
): Promise<ReturnTypes[T][]> {
  const query = `*[_type == "${type}"]`;
  return await sanityClient.fetch<ReturnTypes[T][]>(query);
}

export async function fetchAllOrdered<T extends keyof ReturnTypes>(
  type: T,
): Promise<ReturnTypes[T][]> {
  const query = `*[_type == "${type}"]|order(orderRank asc)`;
  return await sanityClient.fetch<ReturnTypes[T][]>(query);
}

type CauseAreaWithCharities = CauseArea & {
  charities: Charity[];
};

export async function fetchAllCauseAreasWithCharities(): Promise<
  CauseAreaWithCharities[]
> {
  const query = `*[_type=='causeArea']|order(orderRank asc){...,
    "charities": *[_type=='charity' && references(^._id)]|order(orderRank asc)
  }`;
  return await sanityClient.fetch<CauseAreaWithCharities[]>(query);
}
