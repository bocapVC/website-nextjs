import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

/** DIRECTORIO is read when `@/data/directorio` loads, so each case mocks the JSON file and re-imports. */
async function renderTabsWith(entries: object[]) {
  vi.resetModules();
  vi.doMock("@/data/directorio.json", () => ({ default: { entries } }));
  const { EcosistemaTabs } = await import("../EcosistemaTabs");
  render(<EcosistemaTabs />);
}

describe("EcosistemaTabs with admin-edited directorio", () => {
  afterEach(() => {
    vi.doUnmock("@/data/directorio.json");
  });

  it.each([
    ["missing", { name: "Fondo Mínimo", category: "Fondos", logo: "/logos/x.svg" }],
    [
      "empty",
      {
        name: "Fondo Mínimo",
        category: "Fondos",
        logo: "/logos/x.svg",
        type: "",
        description: "",
        location: "",
        focus: [],
        website: "",
      },
    ],
  ])("renders an entry whose optional fields are %s", async (_, entry) => {
    await renderTabsWith([entry]);

    expect(screen.getByText("Fondo Mínimo")).toBeInTheDocument();
    expect(screen.getByAltText("Logo de Fondo Mínimo")).toBeInTheDocument();
    expect(screen.queryByText(/Enfoque/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Visitar sitio/ })).not.toBeInTheDocument();
  });
});
