const appendDetailElement = (container, title, value) => {
    const titleElement = document.createElement("div");
    titleElement.className = "detail-title";
    titleElement.appendChild(document.createTextNode(title));

    const valueElement = document.createElement("div");
    valueElement.className = "detail-value";
    if (title == 'DURATION') {
        valueElement.className = "duration-detail-value";
    }
    valueElement.appendChild(document.createTextNode(value));

    const detailElement = document.createElement("div");
    detailElement.appendChild(titleElement);
    detailElement.appendChild(valueElement);

    container.appendChild(detailElement);
};

export const createMovieDetails = (movie) => {
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "movie-details-container";
    const genres = movie.genres.genres.map(
        genre => genre.text
    )
    const durationInSeconds = movie.runtime.seconds;
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    appendDetailElement(detailsContainer, "NAME", movie.originalTitleText.text);
    appendDetailElement(detailsContainer, "GENRES", genres.join(", "));
    appendDetailElement(detailsContainer, "SYNOPSIS", movie.plot.plotText.plainText);
    appendDetailElement(detailsContainer, "DURATION", formattedDuration);

    return detailsContainer;
};
