// pageEffect.js
document.addEventListener("DOMContentLoaded", function() {
    const pageFlip = new St.PageFlip(document.body, {
        width: window.innerWidth,
        height: window.innerHeight,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 400,
        maxHeight: 1533,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false
    });

    const content = document.getElementById("content").innerHTML;
    const pages = createPages(content, pageFlip.getSettings().width, pageFlip.getSettings().height);
    document.body.innerHTML = pages;

    pageFlip.loadFromHTML(document.querySelectorAll(".page"));
});

function createPages(content, pageWidth, pageHeight) {
    const words = content.split(" ");
    let pages = "";
    let pageContent = "";
    let tempDiv = document.createElement("div");
    tempDiv.style.width = `${pageWidth}px`;
    tempDiv.style.height = `${pageHeight}px`;
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);

    words.forEach(word => {
        tempDiv.innerHTML += word + " ";
        if (tempDiv.scrollHeight > pageHeight) {
            pages += `<div class="page"><div class="page-content">${pageContent.trim()}</div></div>`;
            pageContent = word + " ";
            tempDiv.innerHTML = word + " ";
        } else {
            pageContent += word + " ";
        }
    });

    pages += `<div class="page"><div class="page-content">${pageContent.trim()}</div></div>`;
    document.body.removeChild(tempDiv);
    return pag
        es;
}
