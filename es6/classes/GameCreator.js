// functia constructor pentru un joc creat de utilizator
class GameCreator {
    constructor (title, releaseDate, genre, publisher, imageUrl, description) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.publisher = publisher;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    validateFormElement (inputElement, errorMessage) {
        if (inputElement.value === "") {
            if (!document.querySelector('[rel="' + inputElement.id + '"]')){
                this.buildErrorMessage(inputElement, errorMessage);
            }
        } else {
            if (document.querySelector('[rel="' + inputElement.id + '"]')){
                document.querySelector('[rel="' + inputElement.id + '"]').remove();
                inputElement.classList.remove("inputError");
            }
        }
    }

    validateReleaseTimestampElement (inputElement, errorMessage) {
        if (isNaN(inputElement.value) && inputElement.value !== "") {
            this.buildErrorMessage(inputElement, errorMessage);
        }
    }

    buildErrorMessage (inputEl, errosMsg) {
        inputEl.classList.add("inputError");
        const errorMsgElement = document.createElement("span");
        errorMsgElement.setAttribute("rel", inputEl.id);
        errorMsgElement.classList.add("errorMsg");
        errorMsgElement.innerHTML = errosMsg;
        inputEl.after(errorMsgElement);
    }
}