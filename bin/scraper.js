import cheerio from "cheerio";
import got from "got";

export const getPDF = async (title) => {
    // parse the novel index and find number of chapters
    const baseURL = `https://boxnovel.com/${title}/`
    const novelIndex = await got(baseURL)

    let $ = cheerio.load(novelIndex.body)
    const latestChapter = $('.wp-manga-chapter').first().text()
    console.log(`Here's the latest chapter: ${latestChapter}`);
}
