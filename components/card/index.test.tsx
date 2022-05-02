import { Restaurant } from "@/pages/index";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from ".";
import { StarRating, SupportingText } from ".";
import Cookies from "js-cookie";

jest.mock('js-cookie')

const mockedCookies = Cookies as jest.Mocked<typeof Cookies>

function getRandomNumber (min: number, max: number) {
  return Math.random() * (max - min) + min
}
function getRandomInteger (min: number, max: number) {
  const lowerBound = Math.ceil(min);
  const upperBound = Math.floor(max);
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound)
}

describe('StarRating component', () => {
  it('renders the correct amount of stars w/ a rating', () => {
    const stars = getRandomNumber(0, 5)
    const rating = getRandomInteger(0, 10000)

    render(<StarRating stars={stars} rating={rating} />)

    if (stars < 1) {
      expect(screen.queryByAltText('Filled-in Star')).not.toBeInTheDocument()
    } else {
      expect(screen.getAllByAltText('Filled-in Star')).toHaveLength(Math.floor(stars))
    }
    expect(screen.getAllByAltText('Empty Star')).toHaveLength(5 - (Math.floor(stars)))
    expect(screen.getByText(`(${rating})`)).toBeInTheDocument()
  })
  it('matches snapshot', () => {
    const stars = 4.2
    const rating = 1738

    const { container } = render(<StarRating stars={stars} rating={rating} />)

    expect(container).toMatchSnapshot()
  })
})

describe('SupportingText component', () => {
  it('matches snapshot for an Open Now restaurant', () => {
    const card = {
      business_status: 'OPERATIONAL',
      opening_hours: { open_now: true }
    } as Restaurant

    const { container } = render(<SupportingText card={card} />)

    expect(container).toMatchSnapshot()
  })
  it('matches snapshot for a Not Open restaurant', () => {
    const card = {
      business_status: 'OPERATIONAL',
      opening_hours: { open_now: false }
    } as Restaurant

    const { container } = render(<SupportingText card={card} />)

    expect(container).toMatchSnapshot()
  })
  it('matches snapshot for a Permanently Closed restaurant', () => {
    const card = {
      business_status: 'CLOSED_TEMPORARILY',
      permanently_closed: true
    } as Restaurant

    const { container } = render(<SupportingText card={card} />)

    expect(container).toMatchSnapshot()
  })
  it('matches snapshot for a Temporarily Closed restaurant', () => {
    const card = {
      business_status: 'CLOSED_TEMPORARILY',
      permanently_closed: false
    } as Restaurant

    const { container } = render(<SupportingText card={card} />)

    expect(container).toMatchSnapshot()
  })
  it('matches snapshot if business_status is missing', () => {
    const card = {} as Restaurant

    const { container } = render(<SupportingText card={card} />)

    expect(container).toMatchSnapshot()
  })
})

describe('Card component', () => {
  let card = {} as Restaurant

  beforeEach(() => {
    mockedCookies.get.mockClear()
    mockedCookies.set.mockClear()
    card = {
      name: 'Test Restaurant',
      place_id: 'placeTestId',
      price_level: 2,
      rating: 3.8,
      user_ratings_total: 1234
    } as Restaurant
  })

  it('handles favoriting a card', () => {
    const initialCookies = ["notThisPlaceId"]
    mockedCookies.get.mockReturnValue(JSON.stringify(initialCookies))

    render(<Card card={card} />)
    fireEvent.click(screen.getByAltText('empty heart'))

    expect(mockedCookies.set).toHaveBeenCalledWith('favorites', JSON.stringify([...initialCookies, card.place_id]))
    expect(screen.getByAltText('restaurant favorited')).toBeInTheDocument()
  })

  it('handles unfavoriting a card', () => {
    const initialCookies = ["notThisPlaceId", card.place_id]
    mockedCookies.get.mockReturnValue(JSON.stringify(initialCookies))

    render(<Card card={card} />)
    fireEvent.click(screen.getByAltText('restaurant favorited'))

    expect(mockedCookies.set).toHaveBeenCalledWith('favorites', JSON.stringify(["notThisPlaceId"]))
    expect(screen.getByAltText('empty heart')).toBeInTheDocument()
  })

  it('matches snapshot for an unfavorited card', () => {
    mockedCookies.get.mockReturnValue(undefined)

    const { container } = render(<Card card={card} />)

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot for a favorited card', () => {
    mockedCookies.get.mockReturnValue('["notThisPlaceId","placeTestId"]')

    const { container } = render(<Card card={card} />)

    expect(container).toMatchSnapshot()
  })

  it('matches snapshot for a restaurant with photo', () => {
    card = { ...card, photo_url: '/martis-trail.png' }
    mockedCookies.get.mockReturnValue(undefined)

    const { container } = render(<Card card={card} />)

    expect(container).toMatchSnapshot()
  })
})