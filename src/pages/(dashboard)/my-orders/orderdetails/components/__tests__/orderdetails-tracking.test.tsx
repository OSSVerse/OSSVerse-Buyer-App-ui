import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OrderDetailsTracking from "../orderdetails-tracking";
import type { StageItem } from "../orderdetails-page";

describe("OrderDetailsTracking Component", () => {
  const mockStages: StageItem[] = [
    { name: "Order Placed", remark: "", status: "completed" },
    { name: "OASP Selected", remark: "Pending Acceptance", status: "pending" },
    { name: "OASP Assigned", remark: "Work in Progress", status: "pending" },
    { name: "Delivered", remark: "Completed", status: "pending" },
  ];

  it("renders all stages correctly", () => {
    render(<OrderDetailsTracking stages={mockStages} />);

    // biome-ignore lint/complexity/noForEach: <explanation>
    mockStages.forEach((stage) => {
      expect(screen.getByText(stage.name)).toBeInTheDocument();
      if (stage.remark) {
        expect(screen.getByText(`(${stage.remark})`)).toBeInTheDocument();
      }
    });
  });

  it("displays the correct variant based on stage status", () => {
    const { container } = render(<OrderDetailsTracking stages={mockStages} />);

    // Because the pending/default variant will reflet to the class
    const completedStages = container.getElementsByClassName(
      "text-white bg-black",
    );
    const pendingStages = container.getElementsByClassName(
      "text-stone-400 bg-stone-200",
    );

    // So according to the date, should be 1 checked
    expect(completedStages.length).toBe(1);
    // according to the mockStages data, should be 3 uncheck
    expect(pendingStages.length).toBeGreaterThanOrEqual(3);
  });

  it("renders separators between stages", () => {
    render(<OrderDetailsTracking stages={mockStages} />);

    // Separator will be present only between stages (total separators = stages - 1)
    const separators = screen.getAllByRole("separator");
    expect(separators.length).toBe(mockStages.length - 1);
  });
});
