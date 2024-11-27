import { render, screen } from "@testing-library/react";
import PlaceOrderConfirm from "../placeorder-comfirm";

describe("PlaceOrderConfirm Component", () => {
  const mockData = {
    name: "Sample Artifact",
    services: [
      { id: "service1", name: "Service 1" },
      { id: "service2", name: "Service 2" },
    ],
    total_payment_amount: "1000",
  };

  it("renders correctly with required props", () => {
    render(<PlaceOrderConfirm {...mockData} />);

    expect(
      screen.getByText(
        /Below are a summary of the artifact, selected services basedon selected OASPs, and pricing./i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Selected Services")).toBeInTheDocument();

    // biome-ignore lint/complexity/noForEach: <explanation>
    mockData.services.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/Artifact Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Pricing/i)).toBeInTheDocument();

    expect(screen.getByText("Sample Artifact")).toBeInTheDocument();

    expect(screen.getByText(/₹1000/i)).toBeInTheDocument();
  });

  it("renders services as empty when services array is empty", () => {
    render(<PlaceOrderConfirm {...mockData} services={[]} />);
    expect(screen.getByText("Selected Services")).toBeInTheDocument();
    expect(screen.queryByText(/Service 1/i)).not.toBeInTheDocument();
  });
});
