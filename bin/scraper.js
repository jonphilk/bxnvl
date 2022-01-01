import puppeteer from 'puppeteer'

export const getPDF = async (title) => {
    // launch headless chrome and go to novel index
    const baseURL = `https://boxnovel.com/novel/${title}/`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(baseURL)

    // find latest chapter
    const latestChapter = await page.$eval('.wp-manga-chapter > a', el => el.innerText)
    console.log(`The latest chapter is: ${latestChapter}`)

    // go through chapters and retrieve text

    await browser.close()

}
