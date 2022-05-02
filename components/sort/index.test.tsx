import { fireEvent, render, screen } from "@testing-library/react";
import SortButton from ".";

const handleSort = jest.fn()
describe('SortButton component', () => {
  it('matches snapshot before clicking Sort button', () => {
    const { container } = render(<SortButton handleSort={handleSort} />)

    expect(container).toMatchSnapshot()
  })
  it('matches snapshot after clicking Sort button', () => {
    const { container } = render(<SortButton handleSort={handleSort} />)
    fireEvent.click(screen.getByText('Sort'))

    expect(container).toMatchSnapshot()
  })
  it('matches snapshot after applying Sort', () => {
    const { container } = render(<SortButton handleSort={handleSort} />)
    fireEvent.click(screen.getByText('Sort'))
    fireEvent.click(screen.getByLabelText('Ratings: Low to High'))
    fireEvent.click(screen.getByText('Apply'))

    expect(container).toMatchSnapshot()
  })
  it('should handle form submission', () => {
    render(<SortButton handleSort={handleSort} />)
    fireEvent.click(screen.getByText('Sort'))
    fireEvent.click(screen.getByLabelText('Ratings: Low to High'))
    fireEvent.click(screen.getByText('Apply'))

    expect(handleSort).toHaveBeenCalledWith('ASC')
  })
})