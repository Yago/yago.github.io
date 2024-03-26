/**
 * Hydrate on first click on a given id
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  document.getElementById(opts.value)?.addEventListener('click', async () => {
    const hydrate = await load()
    await hydrate()
  }, { once: true })
}