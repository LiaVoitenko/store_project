export const isDesctopViewport = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
}