import all1minimalSanity from './all-1-minimal-sanity.mjs'

export default async () => {
  const all1Promise = all1minimalSanity()
  await all1Promise

  return Promise.all([all1Promise])
}
