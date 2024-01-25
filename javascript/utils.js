export const createImag = (movie) => {
    const imag = movie.primaryImage.url
    const alternativeText = movie.primaryImage.caption.plainText
    const imgElement = document.createElement("img");
    imgElement.src = imag
    imgElement.alt = alternativeText
    return imgElement
}
