import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuickAccess } from "../QuickAccess";

describe("QuickAccess", () => {
  it("links to each of the other four routes", () => {
    render(<QuickAccess />);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining(["/ecosistema", "/recursos", "/convocatorias", "/membresia"]),
    );
  });
});
