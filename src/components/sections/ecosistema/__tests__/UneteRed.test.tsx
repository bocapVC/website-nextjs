import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UneteRed } from "../UneteRed";

describe("UneteRed", () => {
  it("links the CTA to the membership page", () => {
    render(<UneteRed />);
    expect(screen.getByRole("link", { name: "Quiero ser miembro" })).toHaveAttribute(
      "href",
      "/membresia",
    );
  });
});
