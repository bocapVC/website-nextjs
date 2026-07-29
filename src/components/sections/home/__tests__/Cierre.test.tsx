import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cierre } from "../Cierre";

describe("Cierre", () => {
  it("links the CTA to the membership form", () => {
    render(<Cierre />);
    expect(screen.getByRole("link", { name: "Unirse" })).toHaveAttribute(
      "href",
      "/membresia#unirse",
    );
  });
});
