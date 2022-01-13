import puppeteer from 'puppeteer'
import PDFMerger from 'pdf-merger-js'

export const getPDF = async (title, options) => {
    // launch headless chrome and go to novel index
    const baseURL = `https://boxnovel.com/novel/${title}`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(baseURL)

    const chs = options.chapters.split('-')
    // get specific chapters if provided, or get all chapters
    if (options.chapters) {
        // chapter range
        if (options.chapters.split('-').length == 2) {
            for (let i = chs[0]; i <= chs[1]; i++) {
                await page.goto(`${baseURL}-boxnovel/chapter-${i}`)
                // generate pdf
                await page.pdf({path: `./novels/super-gene/chapter-${i}.pdf`})
            }
        } else {
            // single chapter
            console.log(`Retrieving Chapter ${options.chapters}...`)
            // check if need -boxnovel in novel title slug
            await page.goto(`${baseURL}-boxnovel/chapter-${options.chapters}`)
            await page.pdf({path: `./novels/super-gene/chapter-${options.chapters}.pdf`})
        }
    } else {
        // find latest chapter
        await page.waitForSelector('.wp-manga-chapter > a')
        let latestChapter = await page.$eval('.wp-manga-chapter > a', el => el.innerText)
        latestChapter = latestChapter.split(' ')[1]
        console.log(`The latest chapter is: ${latestChapter}`)
    
        // go through chapters and retrieve text
        for (let i = 1; i <= latestChapter; i++) {
            await page.goto(`${baseURL}/chapter-${i}`)
            await page.pdf({path: `./novels/super-gene/chapter-${i}.pdf`})
        }
    }
    await browser.close()
    
    const merger = new PDFMerger()

    for (let i = chs[0]; i <= chs[1]; i++) {
        merger.add(`./novels/super-gene/chapter-${i}.pdf`)
    }

    await merger.save(`./super-gene-chapters${chs[0]}-${chs[1]}.pdf`)
}
