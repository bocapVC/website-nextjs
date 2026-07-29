import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UnirseForm } from "../UnirseForm";

describe("UnirseForm", () => {
  it("renders the membership form with the Tema field locked (no Tema select)", () => {
    render(<UnirseForm />);
    expect(screen.queryByLabelText(/^Tema/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Mensaje/)).toBeInTheDocument();
  });

  it("hints at describing the organization and its category under Mensaje", () => {
    render(<UnirseForm />);
    expect(screen.getByText(/Fondos, Ángeles, Aceleradoras o Startups/)).toBeInTheDocument();
  });

  it("sets the expectation of a follow-up by email", () => {
    render(<UnirseForm />);
    expect(
      screen.getByText(/te contactaremos por correo electrónico/i),
    ).toBeInTheDocument();
  });
});
