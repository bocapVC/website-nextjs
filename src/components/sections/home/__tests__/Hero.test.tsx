import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

describe("Hero", () => {
  it("includes a CTA linking to /membresia", () => {
    render(<Hero />);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/membresia");
  });

  it("includes a CTA linking to /ecosistema", () => {
    render(<Hero />);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/ecosistema");
  });
});
