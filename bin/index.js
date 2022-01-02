#!/usr/bin/env node

import { Command } from 'commander';
import { getPDF } from './scraper.js'

const app = new Command();

// create a description for the app
app.description('A tool for retrieving pdf/epub novels from boxnovel.com')

// define pdf command
app.command('pdf <title>').action(async (title, options) => {
    await getPDF(title, options)
}).option('-c, --chapters <chapters>', 'specify chapter(s) to retrieve, for example 500 or 50-100')

// run the app
app.parse()
