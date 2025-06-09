import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useGetAllPokemons, useGetEveryPokemonData } from '../api'

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
					json: async () => ({}),
				}),
			),
		)

		const { result } = renderHook(() => useGetAllPokemons(), { wrapper })

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toBeInstanceOf(Error)
		expect((result.current.error as Error).message).toBe(
			'Error while fetching pokemon data.',
		)
	})
})

describe('useGetEveryPokemonData', () => {
	const mockResultList = [
		{
			name: 'venusaur',
			url: 'https://pokeapi.co/api/v2/pokemon/venusaur',
		},
		{
			name: 'charmander',
			url: 'https://pokeapi.co/api/v2/pokemon/charmander',
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
			const data = mockResponses.find((p) => url.includes(p.name))
			return Promise.resolve({
				ok: true,
				json: () => Promise.resolve(data),
			})
		})
		const { result } = renderHook(
			() => useGetEveryPokemonData(mockResultList),
			{ wrapper: wrapper },
		)

		await waitFor(() => {
			expect(result.current.every((query) => query.isSuccess)).toBe(true)
		})

		expect(result.current[0].data?.name).toBe('venusaur')
		expect(result.current[1].data?.name).toBe('charmander')
	})
})
