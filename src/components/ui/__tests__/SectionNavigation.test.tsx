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

  it("renders one dot per home section and scrolls each dot to its own section by id", () => {
    const ids = ["hero", "que-es", "ecosistema", "quienes", "cierre"];
    const scrollIntoView = vi.fn();
    render(
      <>
        <SectionNavigation />
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
