import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { EcosistemaTabs } from "../EcosistemaTabs";
import { DIRECTORIO } from "@/data/directorio";
import { STARTUPS } from "@/data/startups";

describe("EcosistemaTabs", () => {
  it("renders a tab button for Fondos, Ángeles, Aceleradoras and Startups", () => {
    render(<EcosistemaTabs />);
    for (const tab of ["Fondos", "Ángeles", "Aceleradoras", "Startups"]) {
      expect(screen.getByRole("button", { name: tab })).toBeInTheDocument();
    }
  });

  it("defaults to the Fondos tab, showing only Fondos entries", () => {
    render(<EcosistemaTabs />);
    const fondos = DIRECTORIO.filter((entry) => entry.category === "Fondos");
    const others = DIRECTORIO.filter((entry) => entry.category !== "Fondos");

    for (const entry of fondos) {
      expect(screen.getByText(entry.name)).toBeInTheDocument();
    }
    for (const entry of others) {
      expect(screen.queryByText(entry.name)).not.toBeInTheDocument();
    }
  });

  it("switches to Aceleradoras and shows only that category", () => {
    render(<EcosistemaTabs />);
    fireEvent.click(screen.getByRole("button", { name: "Aceleradoras" }));

    const aceleradoras = DIRECTORIO.filter((entry) => entry.category === "Aceleradoras");
    const others = DIRECTORIO.filter((entry) => entry.category !== "Aceleradoras");

    for (const entry of aceleradoras) {
      expect(screen.getByText(entry.name)).toBeInTheDocument();
    }
    for (const entry of others) {
      expect(screen.queryByText(entry.name)).not.toBeInTheDocument();
    }
  });

  it("shows a próximamente state for Ángeles, which has no entries yet", () => {
    render(<EcosistemaTabs />);
    fireEvent.click(screen.getByRole("button", { name: "Ángeles" }));
    expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
  });

  it("switches to Startups and renders a card per startup, or a próximamente state when there are none yet", () => {
    render(<EcosistemaTabs />);
    fireEvent.click(screen.getByRole("button", { name: "Startups" }));

    if (STARTUPS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const startup of STARTUPS) {
        expect(screen.getByText(startup.name)).toBeInTheDocument();
      }
    }
  });
});
