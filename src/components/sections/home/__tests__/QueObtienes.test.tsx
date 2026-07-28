import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueObtienes } from "../QueObtienes";
import { QUE_OBTIENES } from "@/data/queObtienes";

describe("QueObtienes", () => {
  it("renders one card per entry in QUE_OBTIENES", () => {
    render(<QueObtienes />);
    for (const item of QUE_OBTIENES) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it("links the CTA to the membership page", () => {
    render(<QueObtienes />);
    expect(screen.getByRole("link", { name: "Quiero ser miembro" })).toHaveAttribute(
      "href",
      "/membresia",
    );
  });
});
