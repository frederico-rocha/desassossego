import teamVera from "@/assets/team-vera.jpg";
import teamDebora from "@/assets/team-debora.jpg";
import teamInes from "@/assets/team-ines.jpg";
import teamLeonor from "@/assets/team-leonor.jpg";
import teamFrancis from "@/assets/team-francis.jpg";

export type TeamSlug = "debora" | "francis" | "vera" | "ines" | "leonor";

export interface TeamMember {
  slug: TeamSlug;
  name: string;
  image: string;
}

// Displayed order: Débora, Francis, Vera (cofundadoras), depois Inês e Leonor.
export const teamMembers: TeamMember[] = [
  { slug: "debora", name: "Dra. Débora Macedo", image: teamDebora },
  { slug: "francis", name: "Dra. Francis", image: teamFrancis },
  { slug: "vera", name: "Dra. Vera Botelho da Costa", image: teamVera },
  { slug: "ines", name: "Dra. Inês", image: teamInes },
  { slug: "leonor", name: "Dra. Leonor", image: teamLeonor },
];

export const getTeamMember = (slug: string): TeamMember | undefined =>
  teamMembers.find((m) => m.slug === slug);
