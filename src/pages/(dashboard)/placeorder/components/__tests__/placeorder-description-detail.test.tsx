import { render, screen } from "@testing-library/react";
import DescriptionDetail from "../placeorder-description-detail";
import { ThemeProvider } from "../../../../../context/theme-context";

describe("DescriptionDetail", () => {
  it("renders description_details when provided", () => {
    const description = "This is a description.";
    render(
      <ThemeProvider>
        <DescriptionDetail description_details={description} />
      </ThemeProvider>
    );

    expect(screen.getByText(/this is a description/i)).toBeInTheDocument();
  });

  it("renders feature_enhancement when provided", () => {
    const enhancement = "This is a feature enhancement.";
    render(
      <ThemeProvider>
        <DescriptionDetail feature_enhancement={enhancement} />
      </ThemeProvider>
    );

    expect(
      screen.getByText(/this is a feature enhancement/i),
    ).toBeInTheDocument();
  });

  it("renders both description_details and feature_enhancement when provided", () => {
    const description = "This is a description.";
    const enhancement = "This is a feature enhancement.";
    render(
      <ThemeProvider>
        <DescriptionDetail
          description_details={description}
          feature_enhancement={enhancement}
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/this is a description/i)).toBeInTheDocument();
    expect(
      screen.getByText(/this is a feature enhancement/i),
    ).toBeInTheDocument();
  });

  it("renders nothing when no props are provided", () => {
    render(<DescriptionDetail />);

    expect(
      screen.queryByText(/this is a description/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/this is a feature enhancement/i),
    ).not.toBeInTheDocument();
  });
});
