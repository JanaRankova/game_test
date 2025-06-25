import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { describe, expect, it, vi } from 'vitest'
import { useGetAllPokemons, useGetEveryPokemonData } from '../api'
import { PokemonListItem } from '../types'

const mockResult = {
	results: [
		{
			name: 'venusaur',
			url: 'https://pokeapi.co/api/v2/pokemon/3/',
		},
		{
			name: 'charmander',
			url: 'https://pokeapi.co/api/v2/pokemon/4/',
		},
	],
}

describe('useGetAllPokemons', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: {
							retry: false,
						},
					},
				})
			}
		>
			{children}
		</QueryClientProvider>
	)

	it('Successful api call', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(() =>
				Promise.resolve({
					ok: true,
					json: async () => mockResult,
				}),
			),
		)

		const { result } = renderHook(() => useGetAllPokemons(), { wrapper })

		await waitFor(() => {
			expect(result.current.data?.results[0]).toEqual({
				name: 'venusaur',
				url: 'https://pokeapi.co/api/v2/pokemon/3/',
			})
		})

		expect(result.current.isSuccess).toBeTruthy()
	})

	it('Call ends in error', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(() =>
				Promise.resolve({
					ok: false,
					status: 500,
				}),
			),
		)

		const { result } = renderHook(() => useGetAllPokemons(), { wrapper })

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toBeInstanceOf(Error)
		expect((result.current.error as Error).message).toBe('Error while fetching pokemon data.')
	})
})

describe('useGetEveryPokemonData', () => {
	const mockResultList: PokemonListItem[] = [
		{
			name: 'venusaur',
			url: 'https://pokeapi.co/api/v2/pokemon/3/',
		},
		{
			name: 'charmander',
			url: 'https://pokeapi.co/api/v2/pokemon/4/',
		},
	]

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: {
							retry: false,
						},
					},
				})
			}
		>
			{children}
		</QueryClientProvider>
	)

	it('Successful api call for all queries', async () => {
		const mockResponses = [
			{
				id: 3,
				name: 'venusaur',
				sprites: { front_default: 'front1', back_default: 'back1' },
			},
			{
				id: 4,
				name: 'charmander',
				sprites: { front_default: 'front2', back_default: 'back2' },
			},
		]
		const mockFetch = vi.fn()
		vi.stubGlobal('fetch', mockFetch)

		mockFetch.mockImplementation((url: string) => {
			const data = mockResponses.find((pokemon) => url.includes(pokemon.id.toString()))
			return Promise.resolve({
				ok: true,
				json: () => Promise.resolve(data),
			})
		})
		const { result } = renderHook(() => useGetEveryPokemonData(mockResultList), {
			wrapper: wrapper,
		})

		await waitFor(() => {
			expect(result.current.every((query) => query.isSuccess)).toBe(true)
		})

		expect(result.current[0].data?.name).toBe('venusaur')
		expect(result.current[1].data?.name).toBe('charmander')
	})

	it('Error while fetching detailed pokemon data', async () => {
		const mockFetch = vi.fn()
		vi.stubGlobal('fetch', mockFetch)

		// The most probable scenario is that some queries pass and some fail
		mockFetch.mockImplementation((url: string) => {
			if (url === 'https://pokeapi.co/api/v2/pokemon/3/') {
				return Promise.resolve({
					ok: true,
					json: async () => ({
						id: 3,
						name: 'venusaur',
						sprites: { front_default: 'front1', back_default: 'back1' },
					}),
				})
			}

			if (url === 'https://pokeapi.co/api/v2/pokemon/4/') {
				return Promise.resolve({
					ok: false,
					status: 500,
				})
			}

			return Promise.reject(new Error('Incorrect url'))
		})

		const { result } = renderHook(() => useGetEveryPokemonData(mockResultList), {
			wrapper: wrapper,
		})

		await waitFor(() => {
			expect(result.current.some((query) => query.isError)).toBe(true)
		})

		expect(result.current[0].data?.name).toBe('venusaur')
	})
})
