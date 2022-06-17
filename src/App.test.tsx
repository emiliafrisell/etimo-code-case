import { render, screen } from "@testing-library/react";
import Header from "./layout/header";

test("renders Emilia Frisell name in Header", () => {
  render(<Header />);
  const nameElement = screen.getByText(/Emilia Frisell/i);
  expect(nameElement).toBeInTheDocument();
});
