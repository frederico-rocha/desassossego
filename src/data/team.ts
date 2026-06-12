import teamVera from "@/assets/team-vera.webp";
import teamDebora from "@/assets/team-debora.webp";
import teamInes from "@/assets/team-ines.webp";
import teamLeonor from "@/assets/team-leonor.webp";
import teamFrancis from "@/assets/team-francis.webp";

export type TeamSlug = "debora" | "francis" | "vera" | "ines" | "leonor";

export interface TeamMember {
  slug: TeamSlug;
  name: string;
  image: string;
}

// Displayed order: Débora, Francis, Vera (cofundadoras), depois Inês e Leonor.
export const teamMembers: TeamMember[] = [
  { slug: "debora", name: "Débora Macedo", image: teamDebora },
  { slug: "francis", name: "Francis Anne Teplitzky", image: teamFrancis },
  { slug: "vera", name: "Vera Botelho da Costa", image: teamVera },
  { slug: "ines", name: "Inês Barreira", image: teamInes },
  { slug: "leonor", name: "Leonor Larcher", image: teamLeonor },
];

export const getTeamMember = (slug: string): TeamMember | undefined =>
  teamMembers.find((m) => m.slug === slug);
