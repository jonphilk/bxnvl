import puppeteer from 'puppeteer'

export const getPDF = async (title, options) => {
    // launch headless chrome and go to novel index
    const baseURL = `https://boxnovel.com/novel/${title}`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(baseURL)

    // get specific chapters if provided, or get all chapters
    if (options.chapters) {
        // chapter range
        if (options.chapters.split('-').length == 2) {
            const chs = options.chapters.split('-')
            for (let i = chs[0]; i <= chs[1]; i++) {
                await page.goto(`${baseURL}/chapter-${i}`)
                // generate pdf
            }
        } else {
            // single chapter
        }
    } else {}
    // find latest chapter
    await page.waitForSelector('.wp-manga-chapter > a')
    let latestChapter = await page.$eval('.wp-manga-chapter > a', el => el.innerText)
    latestChapter = latestChapter.split(' ')[1]
    console.log(`The latest chapter is: ${latestChapter}`)

    // go through chapters and retrieve text


    await browser.close()

}
