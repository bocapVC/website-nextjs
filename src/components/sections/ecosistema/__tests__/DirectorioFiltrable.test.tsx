import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DirectorioFiltrable } from "../DirectorioFiltrable";
import { DIRECTORIO, DIRECTORY_CATEGORIES } from "@/data/directorio";

describe("DirectorioFiltrable", () => {
  it("renders a card for every entry in DIRECTORIO by default", () => {
    render(<DirectorioFiltrable />);
    for (const entry of DIRECTORIO) {
      expect(screen.getByText(entry.name)).toBeInTheDocument();
    }
  });

  it("renders a filter chip for every category in DIRECTORY_CATEGORIES", () => {
    render(<DirectorioFiltrable />);
    for (const category of DIRECTORY_CATEGORIES) {
      expect(screen.getByRole("button", { name: category })).toBeInTheDocument();
    }
  });

  it("filters entries down to the selected category", () => {
    const targetCategory = DIRECTORIO[0].category;
    const expected = DIRECTORIO.filter((entry) => entry.category === targetCategory);
    const excluded = DIRECTORIO.filter((entry) => entry.category !== targetCategory);

    render(<DirectorioFiltrable />);
    fireEvent.click(screen.getByRole("button", { name: targetCategory }));

    for (const entry of expected) {
      expect(screen.getByText(entry.name)).toBeInTheDocument();
    }
    for (const entry of excluded) {
      expect(screen.queryByText(entry.name)).not.toBeInTheDocument();
    }
  });
});
