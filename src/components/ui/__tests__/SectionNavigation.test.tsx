import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SectionNavigation } from "../SectionNavigation";

describe("SectionNavigation", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("drops omitted dots and scrolls each remaining dot to its own section by id", () => {
    // Actualidad (#oportunidades) renders nothing below its content threshold.
    const ids = ["hero", "que-es", "ecosistema", "quienes", "cierre"];
    const scrollIntoView = vi.fn();
    render(
      <>
        <SectionNavigation omit={["oportunidades"]} />
        {ids.map((id) => (
          <section key={id} id={id} />
        ))}
      </>,
    );
    document.getElementById("quienes")!.scrollIntoView = scrollIntoView;

    expect(screen.getAllByRole("button")).toHaveLength(ids.length);
    expect(screen.queryByRole("button", { name: /actualidad/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /comunidad/i }));
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });
});
