import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StartupGrid } from "../StartupGrid";
import { STARTUPS } from "@/data/startups";

describe("StartupGrid", () => {
  it("renders a card for every startup, or a próximamente state when there are none yet", () => {
    render(<StartupGrid />);
    if (STARTUPS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const startup of STARTUPS) {
        expect(screen.getByText(startup.name)).toBeInTheDocument();
      }
    }
  });
});
