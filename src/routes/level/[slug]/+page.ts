import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import phrases from "../../../data/phrases";

export const load: PageLoad = ({ params }) => {
  if (params.slug) {
    const index = parseInt(params.slug);

    if (Number.isNaN(index)) {
      error(404, "Level not found");
    }

    if (index > phrases.length) {
      error(404, "Level not found");
    }

    return {
      index
    };
  }
};
