let tawkLoaded = false

export function loadTawk() {
    if (tawkLoaded) return
    tawkLoaded = true

    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/699e0c838f3ea01c37047f18/1ji8m1ofn"
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")

    document.body.appendChild(script)
}
